import { type Accessor, Show } from "solid-js";

import { CloseButton, OutlineButton, SolidButton } from "../../base/components/buttons.tsx";
import { Modal } from "../../base/components/Dialog.tsx";
import type { Entry } from "../hooks/useAppContext.tsx";
import styles from "./EditModal.module.css";

interface Props {
  id: string;
  entry: Accessor<Entry | undefined>;
  onClose: () => void;
  onDelete: (key: string) => void;
  onUpdate: (key: string, value: string) => Promise<boolean>;
}

export function EditModal(props: Props) {
  function onDelete() {
    const entry = props.entry();
    if (entry) props.onDelete(entry.k);
  }

  return (
    <Modal
      action={(formData) => {
        const k = (formData.get("k") as string).trim();
        const v = (formData.get("v") as string).trim();
        return props.onUpdate(k, v);
      }}
      id={props.id}
      onClose={props.onClose}
    >
      <header>
        <h2 class={styles.title}>詳細</h2>
        <CloseButton commandfor={props.id} />
      </header>
      <Show keyed when={props.entry()}>
        {({ k, v }) => (
          <div class={styles.body}>
            <label class={styles.field}>
              <span class={styles.label}>Key</span>
              <input class={styles.input} name="k" readonly type="text" value={k} />
            </label>
            <label class={styles.field}>
              <span class={styles.label}>Value</span>
              <input autofocus class={styles.input} name="v" type="text" value={v} />
            </label>
          </div>
        )}
      </Show>
      <footer class={styles.footer}>
        <button class={styles.btnDelete} on:click={onDelete} type="button">
          削除
        </button>
        <div class={styles.footerRight}>
          <OutlineButton command="close" commandfor={props.id} type="button">
            キャンセル
          </OutlineButton>
          <SolidButton type="submit">更新</SolidButton>
        </div>
      </footer>
    </Modal>
  );
}
