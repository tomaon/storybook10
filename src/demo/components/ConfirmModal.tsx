import { CloseButton, OutlineButton, SolidButton } from "../../base/components/buttons.tsx";
import { Modal } from "../../base/components/Dialog.tsx";
import styles from "./ConfirmModal.module.css";

interface Props {
  id: string;
  message: string;
  onClose: () => void;
  onConfirm: () => Promise<boolean>;
}

export function ConfirmModal(props: Props) {
  return (
    <Modal
      action={props.onConfirm}
      id={props.id}
      onClose={props.onClose}
      style="width: min(360px, calc(100dvw - 2rem))"
    >
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
