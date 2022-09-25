import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../../services/hooks";
import { selectCurrentUser } from "../../user/services/selectors";
import { selectFindMe, selectFilterValue } from "../services/selectors";
import { setUsersPage, useGetUserPageQuery } from "../services/slice";

export const usePageReset = () => {
  const findMeChecked = useAppSelector(selectFindMe);
  const filterValue = useAppSelector(selectFilterValue);
  const currentUser = useAppSelector(selectCurrentUser);

  const { data, refetch } = useGetUserPageQuery(
    { id: currentUser?.id ?? "", orderBy: filterValue },
    {
      skip: !currentUser,
    }
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUsersPage(data.page));
    }
  }, [data]);

  useEffect(() => {
    if (findMeChecked) {
      refetch();
    }
  }, [findMeChecked]);
};
