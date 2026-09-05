import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQuery } from "@apollo/client";

import { clearAuthToken, getAuthToken, subscribeAuthToken } from "@/lib/auth/token";
import { client } from "@/lib/client";
import { identifyUser, resetAnalytics } from "@/lib/posthog";
import { ME_QUERY } from "@/lib/queries/auth";

export type AuthUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
  provider: string;
};

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  loading: boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getAuthToken());
  const { data, loading, error } = useQuery(ME_QUERY, {
    skip: !token,
    fetchPolicy: "network-only",
  });

  useEffect(() => subscribeAuthToken(() => setToken(getAuthToken())), []);

  const user = data?.me ?? null;

  useEffect(() => {
    if (!token || loading || error) {
      return;
    }
    if (data && data.me == null) {
      clearAuthToken();
    }
  }, [token, loading, error, data]);

  useEffect(() => {
    if (user?.id) {
      identifyUser(user.id, user.provider);
    }
  }, [user?.id, user?.provider]);

  const signOut = useCallback(() => {
    resetAnalytics();
    clearAuthToken();
    void client.clearStore();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      loading: Boolean(token) && loading,
      signOut,
    }),
    [token, user, loading, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return value;
}
