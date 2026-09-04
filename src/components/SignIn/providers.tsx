import * as React from "react";

export const SIGN_IN_PROVIDERS = [
  "google",
  "github",
  "apple",
  "facebook",
  "microsoft",
  "email",
] as const;

export type SignInProvider = (typeof SIGN_IN_PROVIDERS)[number];

export type SocialSignInProvider = Exclude<SignInProvider, "email">;

export const DEFAULT_SIGN_IN_PROVIDERS: SignInProvider[] = ["google", "github"];

export const SIGN_IN_PROVIDER_LABELS: Record<SignInProvider, string> = {
  google: "Continue with Google",
  github: "Continue with GitHub",
  apple: "Continue with Apple",
  facebook: "Continue with Facebook",
  microsoft: "Continue with Microsoft",
  email: "Continue with email",
};

const iconClassName = "h-5 w-5 shrink-0";

export const SIGN_IN_PROVIDER_ICONS: Record<SocialSignInProvider, React.ReactNode> = {
  google: (
    <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.82-.07-1.61-.21-2.37H12v4.49h6.46a5.52 5.52 0 0 1-2.4 3.62v3.01h3.88c2.27-2.09 3.55-5.17 3.55-8.75z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.98l-3.88-3.01c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.2A7.21 7.21 0 0 1 4.89 12c0-.76.13-1.5.38-2.2V6.69H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.31l4-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.69l4 3.11C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  ),
  github: (
    <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 .3z"
      />
    </svg>
  ),
  apple: (
    <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.37 12.63c-.03-2.09 1.7-3.1 1.78-3.15-1-1.45-2.55-1.65-3.09-1.67-1.31-.13-2.56.77-3.23.77-.67 0-1.7-.75-2.8-.73-1.44.02-2.77.84-3.51 2.13-1.5 2.6-.38 6.45 1.08 8.56.71 1.03 1.56 2.19 2.67 2.15 1.07-.04 1.48-.69 2.78-.69 1.29 0 1.66.69 2.8.67 1.16-.02 1.89-1.05 2.59-2.09.82-1.2 1.16-2.36 1.18-2.42-.03-.01-2.25-.86-2.25-3.53zM14.6 6.4c.59-.71.98-1.7.87-2.69-.84.03-1.86.56-2.46 1.27-.54.63-1.01 1.65-.88 2.62.93.07 1.89-.47 2.47-1.2z"
      />
    </svg>
  ),
  facebook: (
    <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.54-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.5 0-1.96.93-1.96 1.89v2.27h3.34l-.53 3.49h-2.81V24C19.61 23.09 24 18.1 24 12.07z"
      />
    </svg>
  ),
  microsoft: (
    <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#F25022" d="M1 1h10.5v10.5H1z" />
      <path fill="#7FBA00" d="M12.5 1H23v10.5H12.5z" />
      <path fill="#00A4EF" d="M1 12.5h10.5V23H1z" />
      <path fill="#FFB900" d="M12.5 12.5H23V23H12.5z" />
    </svg>
  ),
};
