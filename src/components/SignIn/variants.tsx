import { cva } from "class-variance-authority";

export const signInVariants = cva(
  "mx-auto w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
  {
    variants: {
      layout: {
        stacked: "space-y-4",
        compact: "space-y-3 p-4",
      },
    },
    defaultVariants: {
      layout: "stacked",
    },
  }
);

export const signInProviderButtonVariants = cva(
  "inline-flex h-11 w-full items-center justify-center gap-3 rounded-md border border-slate-200 bg-white px-4 text-sm font-medium text-slate-950 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-300",
  {
    variants: {
      provider: {
        google: "",
        github: "",
        apple: "",
        facebook: "",
        microsoft: "",
      },
    },
  }
);
