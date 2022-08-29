import { useEffect } from "react";
import { getUserPage } from "../../../api/requests";
import { useAppSelector, useAppDispatch } from "../../../services/hooks";
import { selectCurrentUser } from "../../user/services/selectors";
import { selectFindMe, selectFilterValue } from "../services/selectors";
import { setUsersPage } from "../services/slice";

export const usePageReset = () => {
  const findMeChecked = useAppSelector(selectFindMe);
  const filterValue = useAppSelector(selectFilterValue);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser && findMeChecked) {
      getUserPage(currentUser, { orderBy: filterValue }).then((data) =>
        dispatch(setUsersPage(data.page))
      );
    } else {
      dispatch(setUsersPage(0));
    }
  }, [findMeChecked, filterValue]);
};
