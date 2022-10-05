import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { loginLink } from "../AuthRouter/routes";

const AuthGuard: FC = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to={loginLink()} replace />;
};

export default AuthGuard;
