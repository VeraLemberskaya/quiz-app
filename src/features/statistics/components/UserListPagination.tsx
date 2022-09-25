import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import {
  selectUserListTotalPages,
  selectUsersPage,
} from "../services/selectors";
import { setUsersPage } from "../services/slice";
import Pagination from "../../../components/UI/Pagination";

const UserListPagination: FC = () => {
  const pageCount = useAppSelector(selectUserListTotalPages) as number;
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
