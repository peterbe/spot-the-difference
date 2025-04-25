import { Route, Routes } from "react-router";
import { About } from "./About";
import { App } from "./App";
import { Layout } from "./Layout";
import { Play } from "./Play";
import { Stats } from "./Stats";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/play" element={<Play />} />
        <Route path="/about" element={<About />} />
        {/* Temporary! This is just so I can compare the web-perf
        between this page and the SSG one */}
        <Route path="/about-csr" element={<About />} />
        <Route path="/stats" element={<Stats />} />
      </Route>
    </Routes>
  );
}
