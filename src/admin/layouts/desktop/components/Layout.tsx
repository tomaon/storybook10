import { A, type RouteSectionProps, useLocation } from "@solidjs/router";
import { createEffect, createSignal, Match, on, type ParentProps, Switch } from "solid-js";

import { WaffleIcon, XMarkIcon } from "../../../components/icons.tsx";
import { AuthContextProvider, useAuthContext } from "../hooks/useAuthContext.tsx";
import styles from "./Layout.module.css";
import { Login } from "./Login.tsx";
import { Bar, Baz, Foo } from "./MenuItem.tsx";
import { MenuModal } from "./MenuModal.tsx";

function AdminShell(props: ParentProps) {
  const location = useLocation();

  const [menu, setMenu] = createSignal(false);

  createEffect(
    on(
      () => location.pathname,
      () => setMenu(false),
      { defer: true },
    ),
  );

  createEffect(
    on(
      menu,
      (v) => {
        const dialog = document.getElementById("menu-modal") as HTMLDialogElement;
        if (v) {
          dialog.showModal();
        } else if (dialog.open) {
          dialog.close();
        }
      },
      { defer: true },
    ),
  );

  return (
    <div class={styles.root}>
      <aside class={styles.aside}>
        <nav>
          <ul>
            <li>
              <button on:click={() => setMenu(true)} tabIndex={-1} type="button">
                <WaffleIcon />
              </button>
            </li>
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
        </nav>
      </aside>

      <header class={styles.header}>
        <h1>
          <A href="/admin" tabIndex={-1}>
            admin
          </A>
        </h1>
        <XMarkIcon />
      </header>

      <main class={styles.main}>{props.children}</main>

      <MenuModal id="menu-modal" onClose={() => setMenu(false)} />
    </div>
  );
}

function Content(props: ParentProps) {
  const { isLoggedIn } = useAuthContext();

  return (
    <Switch fallback={<Login />}>
      <Match when={isLoggedIn()}>
        <AdminShell>{props.children}</AdminShell>
      </Match>
    </Switch>
  );
}

export function Layout(props: RouteSectionProps) {
  return (
    <AuthContextProvider>
      <Content {...props} />
    </AuthContextProvider>
  );
}
