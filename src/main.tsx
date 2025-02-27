import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { FirebaseProvider } from "./firebase-context";
import { AppRoutes } from "./routes.tsx";

const root = document.getElementById("root");
if (!root) throw new Error("No root element found");
createRoot(root).render(
  <StrictMode>
    <FirebaseProvider>
      <AppRoutes />
    </FirebaseProvider>
  </StrictMode>,
);
