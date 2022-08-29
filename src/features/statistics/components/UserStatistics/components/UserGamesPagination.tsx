import { FC } from "react";
import Pagination from "../../../../../components/UI/Pagination";
import { useAppDispatch, useAppSelector } from "../../../../../services/hooks";
import {
  selectUserGamesListTotalPages,
  selectUserGamesPage,
} from "../../../services/selectors";
import { setUserGamesPage } from "../../../services/slice";

const UserGamesPagination: FC = () => {
  const page = useAppSelector(selectUserGamesPage);
  const pageCount = useAppSelector(selectUserGamesListTotalPages) as number;
  const dispatch = useAppDispatch();
  return (
    <Pagination
      type="arrow"
      pageCount={pageCount}
      forcePage={page}
      onPageChange={(page) => dispatch(setUserGamesPage(page))}
    />
  );
};

export default UserGamesPagination;
