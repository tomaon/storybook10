import { SolidButton } from "../../../../base/components/buttons.tsx";
import { useAuthContext } from "../hooks/useAuthContext.tsx";
import styles from "./Login.module.css";

export function Login() {
  const { login } = useAuthContext();

  return (
    <section class={styles.root}>
      <SolidButton on:click={login} type="button">
        Login
      </SolidButton>
    </section>
  );
}
