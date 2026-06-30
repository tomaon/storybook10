import { CloseButton, OutlineButton, SolidButton } from "../../base/components/buttons.tsx";
import { Modal } from "../../base/components/Dialog.tsx";
import styles from "./AddModal.module.css";

interface Props {
  id: string;
  onCreate: (key: string, value: string) => Promise<boolean>;
}

export function AddModal(props: Props) {
  return (
    <Modal
      action={(formData) => {
        const k = (formData.get("key") as string).trim();
        const v = (formData.get("value") as string).trim();
        return props.onCreate(k, v);
      }}
      id={props.id}
    >
      <header>
        <h2 class={styles.title}>エントリーを追加</h2>
        <CloseButton commandfor={props.id} />
      </header>
      <div class={styles.body}>
        <label class={styles.field}>
          <span class={styles.label}>Key</span>
          <input autofocus class={styles.input} name="key" required type="text" />
        </label>
        <label class={styles.field}>
          <span class={styles.label}>Value</span>
          <input class={styles.input} name="value" type="text" />
        </label>
      </div>
      <footer>
        <OutlineButton command="close" commandfor={props.id} type="button">
          キャンセル
        </OutlineButton>
        <SolidButton type="submit">追加</SolidButton>
      </footer>
    </Modal>
  );
}
