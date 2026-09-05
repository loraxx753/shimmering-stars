import posthog from "posthog-js";

const token = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN?.trim();
const host =
  import.meta.env.VITE_POSTHOG_HOST?.trim() || "https://us.i.posthog.com";

function stripQuery(url: unknown): string | undefined {
  if (typeof url !== "string") {
    return undefined;
  }
  return url.split("?")[0];
}

if (token) {
  posthog.init(token, {
    api_host: host,
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: false,
    disable_session_recording: true,
    ip: false,
    persistence: "localStorage+cookie",
    sanitize_properties: (properties) => {
      const next = { ...properties };
      const currentUrl = stripQuery(next.$current_url);
      const pathname = stripQuery(next.$pathname) ?? currentUrl;
      if (currentUrl) {
        next.$current_url = currentUrl;
      }
      if (pathname) {
        next.$pathname = pathname;
      }
      delete next.$ip;
      delete next.$raw_user_agent;
      return next;
    },
  });
}

export function capturePageview(pathname: string): void {
  if (!token) {
    return;
  }
  posthog.capture("$pageview", { $pathname: pathname.split("?")[0] });
}

export function identifyUser(userId: string, provider?: string): void {
  if (!token) {
    return;
  }
  posthog.identify(userId, provider ? { provider } : undefined);
}

export function resetAnalytics(): void {
  if (!token) {
    return;
  }
  posthog.reset();
}
