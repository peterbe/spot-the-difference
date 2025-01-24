import { Outlet } from "react-router";
import { Container } from "./Container";
import { Head } from "./Head";

export function Layout() {
  return (
    <Container>
      <Head />
      <Outlet />
    </Container>
  );
}
