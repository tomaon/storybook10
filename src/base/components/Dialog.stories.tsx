import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { CloseButton, OutlineButton, SolidButton } from "./buttons.tsx";
import { Modal } from "./Dialog.tsx";

const meta: Meta = {
  title: "Base/Modal",
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Modal id="story-modal">
      <header>
        <h2>モーダルタイトル</h2>
        <CloseButton commandfor="story-modal" />
      </header>
      <div>
        <p>モーダルのコンテンツがここに入ります。</p>
      </div>
      <footer>
        <OutlineButton command="close" commandfor="story-modal" type="button">
          キャンセル
        </OutlineButton>
        <SolidButton type="button">確定</SolidButton>
      </footer>
    </Modal>
  ),
  play: async () => {
    const dialog = document.getElementById("story-modal") as HTMLDialogElement;
    dialog?.showModal();
  },
};

export const WithForm: Story = {
  render: () => (
    <Modal action={async () => true} id="story-form-modal">
      <header>
        <h2>フォーム付きモーダル</h2>
        <CloseButton commandfor="story-form-modal" />
      </header>
      <div>
        <label>
          <span>名前</span>
          <input name="name" required type="text" />
        </label>
      </div>
      <footer>
        <OutlineButton command="close" commandfor="story-form-modal" type="button">
          キャンセル
        </OutlineButton>
        <SolidButton type="submit">送信</SolidButton>
      </footer>
    </Modal>
  ),
  play: async () => {
    const dialog = document.getElementById("story-form-modal") as HTMLDialogElement;
    dialog?.showModal();
  },
};
