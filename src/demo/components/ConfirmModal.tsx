import { onCleanup, onMount } from "solid-js";

import { CloseButton, OutlineButton, SolidButton } from "../../base/components/buttons.tsx";
import { Modal } from "../../base/components/Dialog.tsx";
import styles from "./ConfirmModal.module.css";

interface Props {
  id: string;
  message: string;
  onConfirm: () => Promise<boolean>;
  onClose?: () => void;
}

export function ConfirmModal(props: Props) {
  onMount(() => {
    const dialog = document.getElementById(props.id) as HTMLDialogElement;
    const handler = () => props.onClose?.();
    dialog?.addEventListener("close", handler);
    onCleanup(() => dialog?.removeEventListener("close", handler));
  });

  return (
    <Modal callback={props.onConfirm} id={props.id} style="width: min(360px, calc(100vw - 2rem))">
      <header>
        <h2 class={styles.title}>確認</h2>
        <CloseButton commandfor={props.id} />
      </header>
      <div class={styles.body}>
        <p class={styles.message}>{props.message}</p>
      </div>
      <footer>
        <OutlineButton command="close" commandfor={props.id} type="button">
          キャンセル
        </OutlineButton>
        <SolidButton type="submit" variant="destructive">
          削除
        </SolidButton>
      </footer>
    </Modal>
  );
}
