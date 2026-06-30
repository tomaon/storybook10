import { type Accessor, createContext, createSignal, type ParentProps, useContext } from "solid-js";

const STORAGE_KEY = "admin-auth";

function readStored() {
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

const authContext = createContext<{
  isLoggedIn: Accessor<boolean>;
  login: () => void;
  logout: () => void;
}>();

export function useAuthContext() {
  return useContext(authContext) as {
    isLoggedIn: Accessor<boolean>;
    login: () => void;
    logout: () => void;
  };
}

export function AuthContextProvider(props: ParentProps) {
  const [isLoggedIn, setIsLoggedIn] = createSignal(readStored());

  function login() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setIsLoggedIn(true);
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsLoggedIn(false);
  }

  return (
    <authContext.Provider value={{ isLoggedIn, login, logout }}>
      {props.children}
    </authContext.Provider>
  );
}
