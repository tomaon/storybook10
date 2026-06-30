import { Route } from "@solidjs/router";

import { Bar } from "./pages/bar.tsx";
import { Baz } from "./pages/baz.tsx";
import { Foo } from "./pages/foo.tsx";
import { Index } from "./pages/index.tsx";

export { Layout } from "./layouts/desktop/components/Layout.tsx";

export function Routes() {
  return (
    <>
      <Route component={Index} path="/" />
      <Route component={Foo} path="/foo" />
      <Route component={Bar} path="/bar" />
      <Route component={Baz} path="/baz" />
    </>
  );
}
