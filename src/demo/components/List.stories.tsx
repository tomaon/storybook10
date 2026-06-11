import { createSignal } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { List } from "./List.tsx";

const meta: Meta = {
  title: "Demo/List",
};

export default meta;

type Story = StoryObj;

const sampleEntries = [
  { k: "name", v: "Alice" },
  { k: "age", v: "30" },
  { k: "city", v: "Tokyo" },
];

export const Default: Story = {
  render: () => {
    const [offset, setOffset] = createSignal(0);
    return (
      <List
        entries={sampleEntries}
        limit={10}
        offset={offset()}
        onDeleteSelected={() => {}}
        onRowClick={() => {}}
        setOffset={setOffset}
        total={sampleEntries.length}
      />
    );
  },
};

export const Empty: Story = {
  render: () => {
    const [offset, setOffset] = createSignal(0);
    return (
      <List
        entries={[]}
        limit={10}
        offset={offset()}
        onDeleteSelected={() => {}}
        onRowClick={() => {}}
        setOffset={setOffset}
        total={0}
      />
    );
  },
};

export const WithPagination: Story = {
  render: () => {
    const PAGE_SIZE = 10;
    const allEntries = Array.from({ length: 25 }, (_, i) => ({
      k: `key${i + 1}`,
      v: `value${i + 1}`,
    }));
    function PaginatedList() {
      const [offset, setOffset] = createSignal(0);
      return (
        <List
          entries={allEntries.slice(offset(), offset() + PAGE_SIZE)}
          limit={PAGE_SIZE}
          offset={offset()}
          onDeleteSelected={() => {}}
          onRowClick={() => {}}
          setOffset={setOffset}
          total={allEntries.length}
        />
      );
    }
    return <PaginatedList />;
  },
};
