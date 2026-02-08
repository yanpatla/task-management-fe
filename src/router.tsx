import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardPage from "@/pages/dashboard.page";
import CreateProjectsPage from "@/pages/projects/create-projects.page";
import EditPorjectPage from "@/pages/projects/edit-project.page";
import DetailsProjectPage from "@/pages/projects/details-project.page";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "@/pages/auth/login.page";
import RegisterPage from "@/pages/auth/register.page";
import ConfirmAccountPage from "@/pages/auth/confirm-account.page";
import RequestNewCodePage from "@/pages/auth/request-new-code.page";
import ForgotPasswordPage from "@/pages/auth/forgot-password.page";
import NewPasswordPage from "@/pages/auth/new-password.page";
import ProjectTeamPage from "./pages/projects/projects-team.page";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} index />
          <Route path="/projects/create" element={<CreateProjectsPage />} />
          <Route path="/projects/:projectId" element={<DetailsProjectPage />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditPorjectPage />}
          />
          <Route
            path="/projects/:projectId/team"
            element={<ProjectTeamPage />}
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountPage />}
          />
          <Route
            path="/auth/request-new-code"
            element={<RequestNewCodePage />}
          />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route path="/auth/new-password" element={<NewPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
