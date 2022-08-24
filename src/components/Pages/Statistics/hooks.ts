import { useEffect, useMemo } from "react";
import { getUserPage } from "../../../api/requests";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectFilterValue,
  selectFindMe,
} from "../../../redux/statistics/selectors";
import {
  setFilterValue,
  setFindMe,
  setUsersPage,
} from "../../../redux/statistics/slice";
import { FilterValue } from "../../../redux/statistics/types";
import { selectCurrentUser } from "../../../redux/user/selectors";
import { User } from "../../../redux/user/types";

export const useFilters = () => {
  const findMeChecked = useAppSelector(selectFindMe);
  const filterValue = useAppSelector(selectFilterValue);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (findMeChecked && currentUser) {
      getUserPage(currentUser, { orderBy: filterValue }).then((data) =>
        dispatch(setUsersPage(data.page))
      );
    } else {
      dispatch(setUsersPage(0));
    }
  }, [findMeChecked, filterValue]);

  const handleFilterValueChange = (filterValue: FilterValue) => {
    dispatch(setFilterValue(filterValue));
  };

  const handleFindMeChange = (checked: boolean) => {
    dispatch(setFindMe(checked));
  };

  return { handleFilterValueChange, handleFindMeChange };
};

export const useUserIndex = (userList: User[] | undefined) => {
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
