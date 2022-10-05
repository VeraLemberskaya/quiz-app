import { FC, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import FormLayout from "../../components/Layouts/FormLayout";
import { userRoutes } from "./routes";
import AuthGuard from "../guards/AuthGuard";
const Account = lazy(() => import("../../features/user/components/Account"));
const ChangePassword = lazy(
  () => import("../../features/user/components/ChangePassword")
);
const ForgotPassword = lazy(
  () => import("../../features/user/components/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("../../features/user/components/ResetPassword")
);

const UserRouter: FC = () => {
  const {
    accountPath,
    changePasswordPath,
    forgotPasswordPath,
    resetPasswordPath,
  } = userRoutes;

  return (
    <Routes>
      <Route element={<FormLayout />}>
        <Route element={<AuthGuard />}>
          <Route path={accountPath} element={<Account />} />
          <Route path={changePasswordPath} element={<ChangePassword />} />
        </Route>
        <Route path={forgotPasswordPath} element={<ForgotPassword />} />=
        <Route path={resetPasswordPath} element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};

export default UserRouter;
