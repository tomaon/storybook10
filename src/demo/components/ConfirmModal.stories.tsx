import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { ConfirmModal } from "./ConfirmModal.tsx";

type T = typeof ConfirmModal;

const meta: Meta<T> = {
  component: ConfirmModal,
};

export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    message: "このエントリーを削除しますか？",
    onConfirm: async () => true,
  },
  play: async () => {
    const dialog = document.getElementById("confirm-modal") as HTMLDialogElement;
    dialog?.showModal();
  },
};

export const LongMessage: Story = {
  args: {
    message:
      "この操作は元に戻せません。本当に削除してもよろしいですか？削除後はデータを復元することができません。",
    onConfirm: async () => true,
  },
  play: async () => {
    const dialog = document.getElementById("confirm-modal") as HTMLDialogElement;
    dialog?.showModal();
  },
};
