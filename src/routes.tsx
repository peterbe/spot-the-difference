import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./App";
import { Play } from "./Play";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/play" element={<Play />} />
        {/* <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<RecentActivity />} />
          <Route path="project/:id" element={<Project />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
