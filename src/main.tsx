import "@/lib/sentry";
import "@/lib/posthog";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/client";
import { AuthProvider } from "@/lib/hooks/useAuth";
import { Sentry } from "@/lib/sentry";

function AppErrorFallback({ error }: { error: unknown }) {
  return (
    <div className="p-6">
      <h2>Something went wrong.</h2>
      {import.meta.env.DEV && error instanceof Error ? (
        <pre className="mt-4 whitespace-pre-wrap text-sm">{error.message}</pre>
      ) : null}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={({ error }) => <AppErrorFallback error={error} />}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApolloProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
