import { ErrorBoundary } from "solid-js";

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
        <Demo />
      </ReasonContextProvider>
    </ErrorBoundary>
  );
}
