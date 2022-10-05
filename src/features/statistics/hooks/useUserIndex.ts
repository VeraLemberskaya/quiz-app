import { useMemo } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useAppSelector } from "../../../store/hooks";
import { selectUserList } from "../services/selectors";

export const useUserIndex = () => {
  const userList = useAppSelector(selectUserList);
  const { user: currentUser } = useAuth();

  const userIndex = useMemo(() => {
    const user = userList?.find((u) => u.id === currentUser?.id);
    if (user) {
      return userList?.indexOf(user) ?? -1;
    }
    return -1;
  }, [userList, currentUser]);

  return userIndex;
};
