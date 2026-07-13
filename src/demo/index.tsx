import { AppContextProvider } from "./hooks/useAppContext.tsx";
import { Root } from "./pages/Root.tsx";

export function Demo() {
  return (
    <AppContextProvider>
      <Root />
    </AppContextProvider>
  );
}
