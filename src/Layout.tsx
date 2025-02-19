import { Outlet } from "react-router";
import { Container } from "./Container";
import { Head } from "./Head";
import { useFirebaseAutoSignIn } from "./use-firebase-signin";

export function Layout() {
  useFirebaseAutoSignIn();

  return (
    <Container>
      <Head />
      <Outlet />
    </Container>
  );
}
