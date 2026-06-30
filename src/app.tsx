import { Navigate, Route, Router } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";

import { Layout as AdminLayout, Routes as AdminRoutes } from "./admin/index.tsx";
import { ReasonContextProvider } from "./base/hooks/useReasonContext.tsx";
import { Demo } from "./demo/index.tsx";

function fallback(error: Error, reset: () => void) {
  return (
    <div>
      <p>{String(error)}</p>
      <button on:click={reset} type="button">
        Try Again
      </button>
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary fallback={fallback}>
      <ReasonContextProvider>
        <Router>
          <Route component={() => <Navigate href="/admin" />} path="/" />
          <Route component={AdminLayout} path="/admin">
            <AdminRoutes />
          </Route>
          <Route component={Demo} path="/demo" />
        </Router>
      </ReasonContextProvider>
    </ErrorBoundary>
  );
}
