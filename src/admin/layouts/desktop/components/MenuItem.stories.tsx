import { MemoryRouter } from "@solidjs/router";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { Bar, Baz, Foo } from "./MenuItem.tsx";

const meta: Meta = {
  title: "Admin/MenuItem",
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <MemoryRouter>
      <ul style={{ display: "flex", gap: "1rem", "list-style": "none", margin: 0, padding: 0 }}>
        <li>
          <Foo />
        </li>
        <li>
          <Bar />
        </li>
        <li>
          <Baz />
        </li>
      </ul>
    </MemoryRouter>
  ),
};
