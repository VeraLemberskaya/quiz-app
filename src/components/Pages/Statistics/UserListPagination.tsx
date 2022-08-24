import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUsersPage } from "../../../redux/statistics/selectors";
import { setUsersPage } from "../../../redux/statistics/slice";
import Pagination from "../../UI/Pagination";

type Props = {
  pageCount: number;
};

const UserListPagination: FC<Props> = ({ pageCount }) => {
  const page = useAppSelector(selectUsersPage);
  const dispatch = useAppDispatch();

  return (
    <Pagination
      pageCount={pageCount}
      forcePage={page}
      onPageChange={(page) => dispatch(setUsersPage(page))}
    />
  );
};

export default UserListPagination;
