import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardPage from "@/pages/dashboard.page";
import CreateProjectsPage from "@/pages/create-projects.page";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} index />
          <Route path="/projects/create" element={<CreateProjectsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
