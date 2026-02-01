import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardPage from "@/pages/dashboard.page";
import CreateProjectsPage from "@/pages/create-projects.page";
import EditPorjectPage from "@/pages/edit-project.page";
import DetailsProjectPage from "@/pages/details-project.page";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "@/pages/login.page";
import RegisterPage from "@/pages/register.page";
import ConfirmAccountPage from "@/pages/confirm-account.page";
import RequestNewCodePage from "@/pages/request-new-code.page";
import ForgotPasswordPage from "@/pages/forgot-password.page";
import NewPasswordPage from "@/pages/new-password.page";

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
