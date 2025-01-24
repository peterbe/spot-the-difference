import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "./routes.tsx";
import { Container } from "./Container.tsx";
import { Head } from "./Head";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Container>
      <Head />

      <AppRoutes />
    </Container>
  </StrictMode>
);
