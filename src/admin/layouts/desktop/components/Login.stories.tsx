import { MemoryRouter } from "@solidjs/router";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { AuthContextProvider } from "../hooks/useAuthContext.tsx";
import { Login } from "./Login.tsx";

const meta: Meta = {
  title: "Admin/Login",
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    sessionStorage.removeItem("admin-auth");
    return (
      <MemoryRouter>
        <AuthContextProvider>
          <Login />
        </AuthContextProvider>
      </MemoryRouter>
    );
  },
};
