import { useEffect } from "react";

import { useAuth } from "../../../hooks/useAuth";

import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { selectFindMe, selectFilterValue } from "../services/selectors";
import { setUsersPage, useGetUserPageQuery } from "../services/slice";

export const usePageReset = () => {
  const findMeChecked = useAppSelector(selectFindMe);
  const filterValue = useAppSelector(selectFilterValue);
  const { user } = useAuth();

  const { data, refetch } = useGetUserPageQuery(
    { id: user?.id ?? "", orderBy: filterValue },
    {
      skip: !user,
    }
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUsersPage(data.page));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (findMeChecked) {
      refetch();
    }
  }, [findMeChecked, refetch]);
};
