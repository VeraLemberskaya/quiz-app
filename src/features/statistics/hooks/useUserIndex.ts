import { useMemo } from "react";
import { useAppSelector } from "../../../services/hooks";
import { selectCurrentUser } from "../../user/services/selectors";
import { selectUserList } from "../services/selectors";

export const useUserIndex = () => {
  const userList = useAppSelector(selectUserList);
  const currentUser = useAppSelector(selectCurrentUser);

  const userIndex = useMemo(() => {
    const user = userList?.find((u) => u.id === currentUser?.id);
    if (user) {
      return userList?.indexOf(user) ?? -1;
    }
    return -1;
  }, [userList, currentUser]);

  return userIndex;
};
