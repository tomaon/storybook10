import { createSignal } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { Pagination } from "./Pagination.tsx";

const meta: Meta = {
  title: "Base/Pagination",
};

export default meta;

type Story = StoryObj;

function Interactive(props: { offset: number; limit: number; total: number }) {
  const [offset, setOffset] = createSignal(props.offset);
  return (
    <Pagination limit={props.limit} offset={offset()} setOffset={setOffset} total={props.total} />
  );
}

export const FirstPage: Story = {
  render: () => <Interactive limit={10} offset={0} total={30} />,
};

export const MiddlePage: Story = {
  render: () => <Interactive limit={10} offset={10} total={30} />,
};

export const LastPage: Story = {
  render: () => <Interactive limit={10} offset={20} total={30} />,
};

export const SinglePage: Story = {
  render: () => <Interactive limit={10} offset={0} total={5} />,
};
