import { FC } from "react";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../features/user/services/selectors";
import { useAppSelector } from "../services/hooks";

type Props = {
  children: JSX.Element;
};

const PrivateRoute: FC<Props> = ({ children }) => {
  const user = useAppSelector(selectCurrentUser);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
