import {
  type Accessor,
  createContext,
  createSignal,
  type ParentProps,
  type Setter,
  useContext,
} from "solid-js";

const reasonContext = createContext<{ reason: Accessor<unknown>; setReason: Setter<unknown> }>();

export function useReasonContext() {
  return useContext(reasonContext) as { reason: Accessor<unknown>; setReason: Setter<unknown> };
}

export function ReasonContextProvider(props: ParentProps) {
  const [reason, setReason] = createSignal<unknown>();

  return (
    <reasonContext.Provider value={{ reason, setReason }}>{props.children}</reasonContext.Provider>
  );
}
