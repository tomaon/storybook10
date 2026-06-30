import { A } from "@solidjs/router";

import { LinkIcon } from "../../../components/icons.tsx";
import styles from "./MenuItem.module.css";

export function Bar() {
  return (
    <A class={styles.root} href="/admin/bar" tabIndex={-1}>
      <LinkIcon />
      <div>Bar</div>
    </A>
  );
}

export function Baz() {
  return (
    <A class={styles.root} href="/admin/baz" tabIndex={-1}>
      <LinkIcon />
      <div>Baz</div>
    </A>
  );
}

export function Foo() {
  return (
    <A class={styles.root} href="/admin/foo" tabIndex={-1}>
      <LinkIcon />
      <div>Foo</div>
    </A>
  );
}
