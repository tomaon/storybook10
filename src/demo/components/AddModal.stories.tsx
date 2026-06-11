import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { AddModal } from "./AddModal.tsx";

type T = typeof AddModal;

const meta: Meta<T> = {
  component: AddModal,
};

export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    onCreate: async () => true,
  },
  play: async () => {
    const dialog = document.getElementById("add-modal") as HTMLDialogElement;
    dialog?.showModal();
  },
};

export const OnCreateFailure: Story = {
  args: {
    onCreate: async () => false,
  },
  play: async () => {
    const dialog = document.getElementById("add-modal") as HTMLDialogElement;
    dialog?.showModal();
  },
};
