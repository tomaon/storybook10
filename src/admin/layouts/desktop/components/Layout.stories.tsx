import { MemoryRouter, Route } from "@solidjs/router";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { Layout } from "./Layout.tsx";

const meta: Meta = {
  title: "Admin/Layout",
};

export default meta;

type Story = StoryObj;

function Shell(props: { loggedIn: boolean }) {
  if (props.loggedIn) {
    sessionStorage.setItem("admin-auth", "1");
  } else {
    sessionStorage.removeItem("admin-auth");
  }

  return (
    <MemoryRouter>
      <Route component={Layout} path="/">
        <div>page content</div>
      </Route>
    </MemoryRouter>
  );
}

export const LoggedOut: Story = {
  render: () => <Shell loggedIn={false} />,
};

export const LoggedIn: Story = {
  render: () => <Shell loggedIn={true} />,
};
