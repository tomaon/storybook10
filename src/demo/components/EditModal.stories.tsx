import { createSignal } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

import type { Entry } from "../hooks/useAppContext.tsx";
import { EditModal } from "./EditModal.tsx";

type T = typeof EditModal;

const meta: Meta<T> = {
  component: EditModal,
};

export default meta;

type Story = StoryObj<T>;

export const WithEntry: Story = {
  render: () => {
    const [entry] = createSignal<Entry>({ k: "greeting", v: "Hello, World!" });
    return (
      <EditModal entry={entry} id="edit-modal" onDelete={() => {}} onUpdate={async () => true} />
    );
  },
  play: async () => {
    const dialog = document.getElementById("edit-modal") as HTMLDialogElement;
    dialog?.showModal();
  },
};

export const EmptyEntry: Story = {
  render: () => {
    const [entry] = createSignal<Entry>();
    return (
      <EditModal entry={entry} id="edit-modal" onDelete={() => {}} onUpdate={async () => true} />
    );
  },
  play: async () => {
    const dialog = document.getElementById("edit-modal") as HTMLDialogElement;
    dialog?.showModal();
  },
};
