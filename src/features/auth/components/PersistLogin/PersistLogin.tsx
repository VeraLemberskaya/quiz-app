import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAuth } from "../../../../hooks/useAuth";
import { useVerifyTokenMutation } from "../../authService";

const PersistLogin: FC = () => {
  const { isAuth } = useAuth();

  const [verifyToken, { isLoading }] = useVerifyTokenMutation();

  useEffect(() => {
    if (isAuth) {
      verifyToken();
    }
  }, []);

  if (!isAuth || !isLoading) {
    return <Outlet />;
  }

  return null;
};

export default PersistLogin;
