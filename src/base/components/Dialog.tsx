import { children, type JSX, splitProps } from "solid-js";

import styles from "./Dialog.module.css";

type Props = JSX.DialogHtmlAttributes<HTMLDialogElement> & {
  id: string; // optional -> required
  action?: (formData: FormData) => Promise<boolean>;
};

export function Modal(props: Props) {
  const [local, others] = splitProps(props, ["children", "action"]);
  const resolved = children(() => local.children);

  // <<Portal /> ?, TODO

  return (
    <dialog {...others} class={styles.root} on:click={onClick} on:close={onClose}>
      {local.action ? <form on:submit={onSubmit(local.action)}>{resolved()}</form> : resolved()}
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

function onSubmit(action: (formData: FormData) => Promise<boolean>) {
  return async (e: SubmitEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (await action(new FormData(form))) {
      form.closest<HTMLDialogElement>("dialog")?.close();
    }
  };
}
