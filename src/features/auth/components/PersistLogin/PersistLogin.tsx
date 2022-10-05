import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { usePersist } from "../../../../hooks/usePersist";
import { useAppSelector } from "../../../../store/hooks";
import { useRefreshMutation } from "../../authService";
import { selectToken } from "../../store/authSelectors";

const PersistLogin: FC = () => {
  const { persist } = usePersist();
  const token = useAppSelector(selectToken);

  const [authFinished, setAuthFinished] = useState<boolean>(false);

  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await refresh();
      setAuthFinished(true);
    };

    if (!token && persist) verifyRefreshToken();
  }, []);

  if (!persist || authFinished) {
    return <Outlet />;
  }

  return null;
};

export default PersistLogin;
