import { fmtNumber0 } from "../utils/format.ts";
import styles from "./Pagination.module.css";

export function Pagination(props: {
  limit: number;
  offset: number;
  setOffset: (value: number) => void;
  total: number;
}) {
  return (
    <nav class={styles.root}>
      <button
        on:click={() => props.setOffset(Math.max(0, props.offset - props.limit))}
        disabled={props.offset <= 0}
        title="前へ"
        type="button"
      >
        &lt;
      </button>
      <div>{fmtNumber0(props.offset + 1)}</div>
      <div>-</div>
      <div>{fmtNumber0(Math.min(props.offset + props.limit, props.total))}</div>
      <button
        on:click={() => props.setOffset(props.offset + props.limit)}
        disabled={props.offset + props.limit >= props.total}
        title="次へ"
        type="button"
      >
        &gt;
      </button>
    </nav>
  );
}
