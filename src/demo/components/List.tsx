import { createEffect, createSignal, For, on, Show } from "solid-js";

import { OutlineButton } from "../../base/components/buttons.tsx";
import { Pagination } from "../../base/components/Pagination.tsx";
import type { Entry } from "../hooks/useAppContext.tsx";
import styles from "./List.module.css";

interface Props {
  entries: Entry[];
  limit: number;
  offset: number;
  setOffset: (value: number) => void;
  total: number;
  onRowClick: (entry: Entry) => void;
  onDeleteSelected: (keys: string[]) => void;
}

function stopPropagation(e: Event) {
  e.stopPropagation();
}

export function List(props: Props) {
  // n = 1
  const [checked, setChecked] = createSignal(new Set<string>());

  // n > 1
  createEffect(
    on(
      () => props.entries,
      () => setChecked(new Set<string>()),
      { defer: true },
    ),
  );

  function allChecked() {
    return props.entries.length > 0 && checked().size === props.entries.length;
  }

  function toggle(key: string) {
    return () =>
      setChecked((prev) => {
        const next = new Set(prev);
        next.has(key) ? next.delete(key) : next.add(key);
        return next;
      });
  }

  function toggleAll() {
    setChecked(new Set<string>(allChecked() ? [] : props.entries.map((e) => e.k)));
  }

  let allCheckEl!: HTMLInputElement;
  createEffect(() => {
    allCheckEl.indeterminate = checked().size > 0 && !allChecked();
  });

  return (
    <section class={styles.root}>
      <header class={styles.header}>
        <div class={styles.headerLeft}>
          <h2 class={styles.name}>KV Store</h2>
          <span class={styles.count}>{props.total}</span>
        </div>
        <div class={styles.headerRight}>
          <OutlineButton command="show-modal" commandfor="add-modal" type="button">
            追加
          </OutlineButton>
          <OutlineButton
            on:click={() => props.onDeleteSelected([...checked()])}
            disabled={checked().size === 0}
            type="button"
          >
            削除
          </OutlineButton>
        </div>
      </header>
      <table class={styles.table}>
        <thead>
          <tr>
            <th class={styles.checkCell}>
              <input
                on:change={toggleAll}
                checked={allChecked()}
                ref={allCheckEl}
                type="checkbox"
              />
            </th>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <Show when={props.entries.length === 0}>
            <tr>
              <td class={styles.empty} colspan="3">
                No entries found.
              </td>
            </tr>
          </Show>
          <For each={props.entries}>
            {(e) => (
              <tr
                class={styles.row}
                classList={{ [styles.rowSelected!]: checked().has(e.k) }}
                on:click={() => props.onRowClick(e)}
              >
                <td
                  class={styles.checkCell}
                  on:click={stopPropagation}
                  on:keydown={stopPropagation}
                >
                  <input on:change={toggle(e.k)} checked={checked().has(e.k)} type="checkbox" />
                </td>
                <td class={styles.keyCell}>{e.k}</td>
                <td>{e.v}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
      <Show when={props.total > props.limit}>
        <Pagination
          limit={props.limit}
          offset={props.offset}
          setOffset={props.setOffset}
          total={props.total}
        />
      </Show>
    </section>
  );
}
