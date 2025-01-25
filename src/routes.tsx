import { BrowserRouter, Route, Routes } from "react-router";
import { About } from "./About";
import { App } from "./App";
import { Layout } from "./Layout";
import { Play } from "./Play";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/play" element={<Play />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<RecentActivity />} />
          <Route path="project/:id" element={<Project />} />
        </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
