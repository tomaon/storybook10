import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { Upper } from "./Upper.tsx";

// CSF(Component Story Format) : https://storybook.js.org/docs/api/csf

type T = typeof Upper;

const meta: Meta<T> = {
  component: Upper,
};

export default meta;

type Story = StoryObj<T>;

export const Default: Story = {};

export const Submit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByRole("textbox"), "hello");
    await userEvent.click(canvas.getByRole("button"));

    await expect(canvas.getByRole("status")).toHaveTextContent("HELLO");
  },
};
