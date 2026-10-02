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
  "inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent hover:shadow-moon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
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
