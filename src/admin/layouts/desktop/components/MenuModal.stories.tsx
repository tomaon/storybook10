import { MemoryRouter } from "@solidjs/router";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { MenuModal } from "./MenuModal.tsx";

const meta: Meta = {
  title: "Admin/MenuModal",
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <MemoryRouter>
      <MenuModal id="menu-modal" onClose={() => {}} />
    </MemoryRouter>
  ),
  play: async () => {
    const dialog = document.getElementById("menu-modal") as HTMLDialogElement;
    dialog?.showModal();
  },
};
