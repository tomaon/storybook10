import { type JSX, splitProps } from "solid-js";

import styles from "./buttons.module.css";

type Props = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export function OutlineButton(props: Props) {
  return <button {...props} class={styles.outline} />;
}

export function SolidButton(props: Props & { variant?: "destructive" }) {
  const [local, rest] = splitProps(props, ["variant"]);
  return (
    <button {...rest} class={local.variant === "destructive" ? styles.destructive : styles.solid} />
  );
}

export function CloseButton(props: Props) {
  return (
    <button {...props} class={styles.close} command="close" type="button" z-index="-1">
      ✕
    </button>
  );
}
