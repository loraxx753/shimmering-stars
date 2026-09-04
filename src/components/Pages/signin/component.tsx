import { useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { SignIn, type SignInProvider, type SocialSignInProvider } from "@/components/SignIn";
import { useAuth } from "@/lib/hooks/useAuth";
import { OAUTH_STATE_KEY } from "@/lib/auth/token";
import { AUTH_URL_QUERY } from "@/lib/queries/auth";
import { PageComponentType } from "@/lib/types";

const SignInPage: PageComponentType = () => {
  const { user, loading, signOut } = useAuth();
  const [lastAction, setLastAction] = useState("Choose Google or GitHub to continue.");
  const [loadingProvider, setLoadingProvider] = useState<SignInProvider | null>(
    null
  );
  const [getAuthUrl] = useLazyQuery(AUTH_URL_QUERY);

  const handleProviderSelect = async (provider: SocialSignInProvider) => {
    setLoadingProvider(provider);
    setLastAction(`Starting ${provider} sign-in…`);
    try {
      const result = await getAuthUrl({
        variables: { provider: provider.toUpperCase() },
      });
      const authUrl = result.data?.authUrl;
      if (!authUrl?.url || !authUrl.state) {
        throw new Error(
          "authUrl failed. Fill astro-server/.env using docs/oauth-setup.md."
        );
      }
      sessionStorage.setItem(OAUTH_STATE_KEY, authUrl.state);
      window.location.assign(authUrl.url);
    } catch (error) {
      setLoadingProvider(null);
      setLastAction(
        error instanceof Error
          ? error.message
          : "Could not start OAuth. Check astro-server env vars."
      );
    }
  };

  if (loading) {
    return (
      <div className="container flex min-h-[70vh] items-center justify-center py-16">
        <p className="text-sm text-slate-500">Checking session…</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-4 py-16">
        <h1 className="text-2xl font-semibold">Signed in</h1>
        <p className="text-sm text-slate-500">
          {user.name || user.email || user.id}
        </p>
        <button
          type="button"
          className="text-sm text-slate-700 underline"
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 py-16">
      <SignIn
        title="Sign in"
        description="Use Google or GitHub. Email/password is not wired yet."
        providers={["google", "github"]}
        loadingProvider={loadingProvider}
        onProviderSelect={handleProviderSelect}
      />
      <p className="max-w-md text-center text-sm text-slate-500">{lastAction}</p>
    </div>
  );
};

export default SignInPage;

SignInPage.path = "/signin";
