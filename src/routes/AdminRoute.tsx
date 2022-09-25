import { FC } from "react";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../features/user/services/selectors";
import { useAppSelector } from "../services/hooks";

type Props = {
  children: JSX.Element;
};

const AdminRoute: FC<Props> = ({ children }) => {
  const user = useAppSelector(selectCurrentUser);
  if (user && user.role === "ADMIN") {
    return children;
  }
  return <Navigate to="/" />;
};

export default AdminRoute;
