import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { OAUTH_STATE_KEY, setAuthToken } from "@/lib/auth/token";
import { EXCHANGE_OAUTH_CODE_MUTATION } from "@/lib/queries/auth";
import { PageComponentType } from "@/lib/types";

let exchangeStarted = false;

const SignInCallbackPage: PageComponentType = () => {
  const [status, setStatus] = useState("Finishing sign-in…");
  const [exchangeOAuthCode] = useMutation(EXCHANGE_OAUTH_CODE_MUTATION);

  useEffect(() => {
    if (exchangeStarted) {
      return;
    }
    exchangeStarted = true;

    const params = new URLSearchParams(window.location.search);
    const providerError = params.get("error_description") || params.get("error");
    const code = params.get("code");
    const state = params.get("state");
    const expectedState = sessionStorage.getItem(OAUTH_STATE_KEY);

    if (providerError) {
      setStatus(providerError);
      return;
    }
    if (!code || !state) {
      setStatus("Missing OAuth code. Start again from Sign in.");
      return;
    }
    if (!expectedState || expectedState !== state) {
      setStatus("OAuth state did not match. Start again from Sign in.");
      return;
    }

    void (async () => {
      try {
        const result = await exchangeOAuthCode({ variables: { code, state } });
        const token = result.data?.exchangeOAuthCode?.token;
        if (!token) {
          throw new Error("The API did not return a session token.");
        }
        sessionStorage.removeItem(OAUTH_STATE_KEY);
        setAuthToken(token);
        window.location.replace("/");
      } catch (error) {
        setStatus(
          error instanceof Error
            ? error.message
            : "Sign-in failed. Check astro-server env vars and try again."
        );
      }
    })();
  }, [exchangeOAuthCode]);

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-3 py-16">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="max-w-md text-center text-sm text-slate-500">{status}</p>
    </div>
  );
};

export default SignInCallbackPage;

SignInCallbackPage.path = "/signin/callback";
