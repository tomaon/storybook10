import {
  createEffect,
  createMemo,
  createResource,
  createSignal,
  Match,
  on,
  Switch,
} from "solid-js";

import { useReasonContext } from "../../base/hooks/useReasonContext.tsx";
import { AddModal } from "../components/AddModal.tsx";
import { ConfirmModal } from "../components/ConfirmModal.tsx";
import { EditModal } from "../components/EditModal.tsx";
import { List } from "../components/List.tsx";
import { type Entry, useAppContext } from "../hooks/useAppContext.tsx";

const PAGE_SIZE = 5;

type PendingConfirm = { message: string; action: () => Promise<boolean> };

function RootContent() {
  const appContext = useAppContext();
  const { reason, setReason } = useReasonContext();

  const [resource, { refetch }] = createResource(() =>
    Promise.all([appContext.getItems(), appContext.length()]),
  );

  async function onFulfilled() {
    await refetch();
    setOffset((current) => {
      const newTotal = resource()?.[1] ?? 0;
      if (newTotal <= 0) return 0;
      const maxOffset = Math.max(0, Math.ceil(newTotal / PAGE_SIZE) - 1) * PAGE_SIZE;
      return Math.min(current, maxOffset);
    });
    return true;
  }

  function onRejected(reason: unknown) {
    setReason(reason);
    return Promise.resolve(false);
  }

  function addItem(key: string, value: string) {
    return appContext.addItem(key, value).then(onFulfilled).catch(onRejected);
  }

  function removeItem(key: string) {
    return appContext.removeItem(key).then(onFulfilled).catch(onRejected);
  }

  function removeItems(keys: string[]) {
    return appContext.removeItems(keys).then(onFulfilled).catch(onRejected);
  }

  function setItem(key: string, value: string) {
    return appContext.setItem(key, value).then(onFulfilled).catch(onRejected);
  }

  const [offset, setOffset] = createSignal(0);
  const [entry, setEntry] = createSignal<Entry>();
  const [pendingConfirm, setPendingConfirm] = createSignal<PendingConfirm>();

  const entries = createMemo(() => (resource()?.[0] ?? []).slice(offset(), offset() + PAGE_SIZE));
  const total = createMemo(() => resource()?.[1] ?? 0);

  function openEdit(entry: Entry) {
    setEntry({ ...entry });
  }

  function closeEdit() {
    setEntry(undefined);
  }

  function openConfirm(message: string, action: () => Promise<boolean>) {
    setPendingConfirm({ message, action });
  }

  function closeConfirm() {
    setPendingConfirm(undefined);
  }

  async function executeConfirm() {
    const pending = pendingConfirm();
    if (!pending) return false;
    return pending.action();
  }

  function onDeleteSelected(keys: string[]) {
    openConfirm(`${keys.length}件のエントリーを削除しますか？`, () => removeItems(keys));
  }

  function onDelete(key: string) {
    openConfirm(`「${key}」を削除しますか？`, async () => removeItem(key));
  }

  createEffect(
    on(
      entry,
      (v) => {
        const dialog = document.getElementById("edit-modal") as HTMLDialogElement;
        if (v) {
          dialog?.showModal();
        } else if (dialog?.open) {
          dialog?.close();
        }
      },
      { defer: true },
    ),
  );

  createEffect(
    on(
      pendingConfirm,
      (v) => {
        const dialog = document.getElementById("confirm-modal") as HTMLDialogElement;
        if (v) {
          dialog?.showModal();
        } else if (dialog?.open) {
          dialog?.close();
        }
      },
      { defer: true },
    ),
  );

  createEffect(
    on(
      reason,
      (v) => {
        if (v) {
          console.error(v);
        }
      },
      { defer: true },
    ),
  );

  return (
    <Switch fallback={<div>Loading...</div>}>
      <Match when={resource.error}>
        <div>データの読み込みに失敗しました。</div>
      </Match>
      <Match when={!resource.loading}>
        <List
          entries={entries()}
          limit={PAGE_SIZE}
          offset={offset()}
          onDeleteSelected={onDeleteSelected}
          onRowClick={openEdit}
          setOffset={setOffset}
          total={total()}
        />
        <AddModal id="add-modal" onCreate={addItem} />
        <EditModal
          entry={entry}
          id="edit-modal"
          onClose={closeEdit}
          onDelete={onDelete}
          onUpdate={setItem}
        />
        <ConfirmModal
          id="confirm-modal"
          message={pendingConfirm()?.message ?? ""}
          onClose={closeConfirm}
          onConfirm={executeConfirm}
        />
      </Match>
    </Switch>
  );
}

export function Root() {
  return <RootContent />;
}
