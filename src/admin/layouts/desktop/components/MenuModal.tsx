import { Modal } from "../../../../base/components/Dialog.tsx";
import { Bar, Baz, Foo } from "./MenuItem.tsx";
import styles from "./MenuModal.module.css";

interface Props {
  id: string;
  onClose: () => void;
}

export function MenuModal(props: Props) {
  return (
    <Modal id={props.id} onClose={props.onClose}>
      <dl class={styles.root}>
        <dt>B</dt>
        <dd>
          <ul>
            <li>
              <Bar />
            </li>
            <li>
              <Baz />
            </li>
          </ul>
        </dd>
        <dt>F</dt>
        <dd>
          <ul>
            <li>
              <Foo />
            </li>
          </ul>
        </dd>
      </dl>
    </Modal>
  );
}
