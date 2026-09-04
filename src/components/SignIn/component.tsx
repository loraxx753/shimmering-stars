import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { Button } from "@/components/ThirdParty/ShadCn/Button";
import { Input } from "@/components/ThirdParty/ShadCn/Input";
import { Label } from "@/components/ThirdParty/ShadCn/Label";
import { cn } from "@/lib/utils";

import {
  DEFAULT_SIGN_IN_PROVIDERS,
  SIGN_IN_PROVIDER_ICONS,
  SIGN_IN_PROVIDER_LABELS,
  type SignInProvider,
  type SocialSignInProvider,
} from "./providers";
import { signInProviderButtonVariants, signInVariants } from "./variants";

export type SignInProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof signInVariants> & {
    title?: string;
    description?: string;
    providers?: SignInProvider[];
    loadingProvider?: SignInProvider | null;
    onProviderSelect?: (provider: SocialSignInProvider) => void | Promise<void>;
    onEmailSubmit?: (email: string, password: string) => void | Promise<void>;
  };

export const SignIn = React.forwardRef<HTMLDivElement, SignInProps>(
  (
    {
      className,
      layout,
      title = "Sign in",
      description = "Use an account you already have.",
      providers = DEFAULT_SIGN_IN_PROVIDERS,
      loadingProvider = null,
      onProviderSelect,
      onEmailSubmit,
      ...props
    },
    ref
  ) => {
    const socialProviders = providers.filter(
      (provider): provider is SocialSignInProvider => provider !== "email"
    );
    const showEmail = providers.includes("email");

    const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const email = String(form.get("email") ?? "");
      const password = String(form.get("password") ?? "");
      void onEmailSubmit?.(email, password);
    };

    return (
      <div
        ref={ref}
        className={cn(signInVariants({ layout }), className)}
        {...props}
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {description ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          ) : null}
        </div>

        {socialProviders.length > 0 ? (
          <div className="flex flex-col gap-2" role="group" aria-label="Sign in providers">
            {socialProviders.map((provider) => (
              <button
                key={provider}
                type="button"
                className={signInProviderButtonVariants({ provider })}
                disabled={loadingProvider !== null}
                aria-label={SIGN_IN_PROVIDER_LABELS[provider]}
                onClick={() => void onProviderSelect?.(provider)}
              >
                {SIGN_IN_PROVIDER_ICONS[provider]}
                <span>
                  {loadingProvider === provider
                    ? "Continuing…"
                    : SIGN_IN_PROVIDER_LABELS[provider]}
                </span>
              </button>
            ))}
          </div>
        ) : null}

        {showEmail && socialProviders.length > 0 ? (
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                or
              </span>
            </div>
          </div>
        ) : null}

        {showEmail ? (
          <form className="space-y-3" onSubmit={handleEmailSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={loadingProvider !== null}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signin-password">Password</Label>
              <Input
                id="signin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={loadingProvider !== null}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loadingProvider !== null}
            >
              {loadingProvider === "email"
                ? "Continuing…"
                : SIGN_IN_PROVIDER_LABELS.email}
            </Button>
          </form>
        ) : null}
      </div>
    );
  }
);

SignIn.displayName = "SignIn";
