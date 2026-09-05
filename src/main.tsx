import "@/lib/sentry";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/client";
import { AuthProvider } from "@/lib/hooks/useAuth";
import { Sentry } from "@/lib/sentry";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<h2>Something went wrong.</h2>}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApolloProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
