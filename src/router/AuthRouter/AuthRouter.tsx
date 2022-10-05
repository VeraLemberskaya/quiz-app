import { FC, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import FormLayout from "../../components/Layouts/FormLayout";
import { authRoutes } from "./routes";

const EmailVerify = lazy(
  () => import("../../features/auth/components/EmailVerify")
);
const Login = lazy(() => import("../../features/auth/components/Login"));
const Register = lazy(() => import("../../features/auth/components/Register"));

const AuthRouter: FC = () => {
  const { registerPath, loginPath, verifyEmailPath } = authRoutes;

  return (
    <Routes>
      <Route element={<FormLayout />}>
        <Route path={registerPath} element={<Register />} />
      </Route>
      <Route path={loginPath} element={<Login />} />
      <Route path={verifyEmailPath} element={<EmailVerify />} />
    </Routes>
  );
};

export default AuthRouter;
