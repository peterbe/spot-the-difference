import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./App";
import { Play } from "./Play";
import { Layout } from "./Layout";
import { About } from "./About";

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
