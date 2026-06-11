import { children, type JSX, splitProps } from "solid-js";

import styles from "./Dialog.module.css";

type Props = JSX.DialogHtmlAttributes<HTMLDialogElement> & {
  id: string; // optional -> required
  callback?: (formData: FormData) => Promise<boolean>;
};

export function Modal(props: Props) {
  const [local, rest] = splitProps(props, ["children", "callback"]);
  const resolved = children(() => local.children);

  // <<Portal /> ?, TODO

  return (
    <dialog {...rest} class={styles.root} on:click={onClick} on:close={onClose}>
      {local.callback ? <form on:submit={onSubmit(local.callback)}>{resolved()}</form> : resolved()}
    </dialog>
  );
}

export function Modeless(_props: Props) {
  throw new Error("not implemented");
}

function onClick(e: Event /* == PointerEvent, != MouseEvent */) {
  if (e.target instanceof HTMLDialogElement) {
    e.target.close();
  }
}

function onClose(e: Event) {
  (e.currentTarget as HTMLDialogElement).querySelector("form")?.reset();
}

function onSubmit(callback: (formData: FormData) => Promise<boolean>) {
  return async (e: SubmitEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (await callback(new FormData(form))) {
      form.closest<HTMLDialogElement>("dialog")?.close();
    }
  };
}
