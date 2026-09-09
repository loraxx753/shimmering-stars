const AUTH_TOKEN_KEY = "ss.auth.token";
export const OAUTH_STATE_KEY = "ss.oauth.state";
export const OAUTH_RETURN_KEY = "ss.auth.next";

function isSafeReturnPath(path: string): boolean {
  return path.startsWith("/") && !path.startsWith("//");
}

export function setOAuthReturnPath(path: string): void {
  if (typeof sessionStorage === "undefined" || !isSafeReturnPath(path)) {
    return;
  }
  sessionStorage.setItem(OAUTH_RETURN_KEY, path);
}

export function getSignInHref(returnPath: string): string {
  if (!isSafeReturnPath(returnPath)) {
    return "/signin";
  }
  return `/signin?next=${encodeURIComponent(returnPath)}`;
}

export function consumeOAuthReturnPath(fallback = "/"): string {
  if (typeof sessionStorage === "undefined") {
    return fallback;
  }
  const next = sessionStorage.getItem(OAUTH_RETURN_KEY);
  sessionStorage.removeItem(OAUTH_RETURN_KEY);
  if (!next || !isSafeReturnPath(next)) {
    return fallback;
  }
  return next;
}

const AUTH_CHANGED = "ss-auth-changed";

export function getAuthToken(): string | null {
  if (typeof localStorage === "undefined") {
    return null;
  }
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  window.dispatchEvent(new Event(AUTH_CHANGED));
}

export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGED));
}

export function subscribeAuthToken(onChange: () => void): () => void {
  const handler = () => onChange();
  window.addEventListener(AUTH_CHANGED, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(AUTH_CHANGED, handler);
    window.removeEventListener("storage", handler);
  };
}
