import type { SignInProvider } from "@/components/SignIn";

/** App-root path. Kit leftover; runtime OAuth config is on astro-server. */
export const AUTH_CONFIG_PATH = "config/auth.yaml";

export type AuthProviderConfig = {
  clientId: string;
  redirectUri: string;
};

export type AuthConfig = {
  providers: SignInProvider[];
  google?: AuthProviderConfig;
  github?: AuthProviderConfig;
  apple?: AuthProviderConfig;
  facebook?: AuthProviderConfig;
  microsoft?: AuthProviderConfig;
};

export type AuthLocalConfig = {
  google?: { clientSecret: string };
  github?: { clientSecret: string };
  apple?: { clientSecret: string };
  facebook?: { clientSecret: string };
  microsoft?: { clientSecret: string };
};
