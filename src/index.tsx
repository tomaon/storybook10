/* @refresh reload */
import { render } from "solid-js/web";

import { App } from "./app.tsx";

import "./index.css";

(() => {
  const root = document.getElementById("root");

  if (!(root instanceof HTMLElement)) {
    throw new Error("notfound: #root");
  }

  render(() => <App />, root);
})();
