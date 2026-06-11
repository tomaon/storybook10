import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { CloseButton, OutlineButton, SolidButton } from "./buttons.tsx";

const meta: Meta = {
  title: "Base/Buttons",
};

export default meta;

type Story = StoryObj;

export const Outline: Story = {
  render: () => <OutlineButton>アウトライン</OutlineButton>,
};

export const OutlineDisabled: Story = {
  render: () => <OutlineButton disabled>アウトライン</OutlineButton>,
};

export const Solid: Story = {
  render: () => <SolidButton>ソリッド</SolidButton>,
};

export const SolidDisabled: Story = {
  render: () => <SolidButton disabled>ソリッド</SolidButton>,
};

export const SolidDestructive: Story = {
  render: () => <SolidButton variant="destructive">削除</SolidButton>,
};

export const Close: Story = {
  render: () => <CloseButton commandfor="dummy" />,
};
