import { For } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  DocumentIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  FolderIcon,
  FolderOpenIcon,
  HomeIcon,
  LinkIcon,
  TagIcon,
  TrashIcon,
  WaffleIcon,
  XMarkIcon,
} from "./icons.tsx";

const meta: Meta = {
  title: "Admin/Icons",
};

export default meta;

type Story = StoryObj;

const icons = [
  ["ChevronDown", ChevronDownIcon],
  ["ChevronLeft", ChevronLeftIcon],
  ["ChevronRight", ChevronRightIcon],
  ["ChevronUp", ChevronUpIcon],
  ["Document", DocumentIcon],
  ["ExclamationCircle", ExclamationCircleIcon],
  ["ExclamationTriangle", ExclamationTriangleIcon],
  ["Folder", FolderIcon],
  ["FolderOpen", FolderOpenIcon],
  ["Home", HomeIcon],
  ["Link", LinkIcon],
  ["Tag", TagIcon],
  ["Trash", TrashIcon],
  ["Waffle", WaffleIcon],
  ["XMark", XMarkIcon],
] as const;

export const Gallery: Story = {
  render: () => (
    <ul
      style={{
        display: "grid",
        gap: "1rem",
        "grid-template-columns": "repeat(auto-fill, minmax(6rem, 1fr))",
        "list-style": "none",
        margin: 0,
        padding: 0,
      }}
    >
      <For each={[...icons]}>
        {([name, Icon]) => (
          <li style={{ "text-align": "center" }}>
            <Icon style={{ height: "1.5rem", width: "1.5rem" }} />
            <div style={{ "font-size": "0.75rem" }}>{name}</div>
          </li>
        )}
      </For>
    </ul>
  ),
};
