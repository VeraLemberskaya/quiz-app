import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectUserGamesPage } from "../../../../redux/statistics/selectors";
import { setUserGamesPage } from "../../../../redux/statistics/slice";
import Pagination from "../../../UI/Pagination";

type Props = {
  pageCount: number;
};

const UserStatisticsPagination: FC<Props> = ({ pageCount }) => {
  const page = useAppSelector(selectUserGamesPage);
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

export default UserStatisticsPagination;
