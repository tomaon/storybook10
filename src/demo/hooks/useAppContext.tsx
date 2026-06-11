import { createContext, type ParentProps, useContext } from "solid-js";

import { IDBStorage, type KeyValuePair } from "../../base/utils/storage.ts";

export type Entry = KeyValuePair<string, string>;

class AppContext {
  private readonly storage: IDBStorage;

  constructor() {
    this.storage = new IDBStorage("storybook10", import.meta.env.MODE);
  }

  addItem(key: string, value: string) {
    return this.storage.addItem<Entry>(key, { k: key, v: value });
  }

  getItems() {
    return this.storage.getItems<Entry>();
  }

  length() {
    return this.storage.length();
  }

  removeItem(key: string) {
    return this.storage.removeItem(key);
  }

  removeItems(keys: string[]) {
    return Promise.all(keys.map((k) => this.removeItem(k)));
  }

  setItem(key: string, value: string) {
    return this.storage.setItem<Entry>(key, { k: key, v: value });
  }
}

const appContext = createContext<AppContext>();

export function useAppContext() {
  return useContext(appContext) as AppContext;
}

export function AppContextProvider(props: ParentProps) {
  return <appContext.Provider value={new AppContext()}>{props.children}</appContext.Provider>;
}
