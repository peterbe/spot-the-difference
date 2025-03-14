import { BrowserRouter, Route, Routes } from "react-router";
import { About } from "./About";
import { App } from "./App";
import { Layout } from "./Layout";
import { Play } from "./Play";
import { Stats } from "./Stats";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/play" element={<Play />} />
          <Route path="/about" element={<About />} />
          <Route path="/stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
