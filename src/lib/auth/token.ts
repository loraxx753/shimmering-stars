const AUTH_TOKEN_KEY = "ss.auth.token";
export const OAUTH_STATE_KEY = "ss.oauth.state";

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
