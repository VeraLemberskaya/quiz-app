import { FC } from "react";
import Table from "../../../../components/UI/Table";

import styles from "./userListTable.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../services/hooks";
import { selectUserList } from "../../services/selectors";
import { User } from "../../../user/services/types";
import { setSelectedUser } from "../../services/slice";
import { useUserIndex } from "../../hooks/useUserIndex";

export const columns = [
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Games",
    className: "text-end",
    accessor: "totalGames",
  },
  {
    Header: "Total Score",
    accessor: "score",
    className: "text-end",
  },
];

type Props = {
  onRowSelect: () => void;
};

const UserListTable: FC<Props> = ({ onRowSelect }) => {
  const userList = useAppSelector(selectUserList);
  const dispatch = useAppDispatch();

  const userIndex = useUserIndex();

  const handleRowSelection = (rowIndex: number) => {
    const user = userList?.[rowIndex];
    if (user) {
      dispatch(setSelectedUser(user));
      onRowSelect();
    }
  };

  return (
    <div className={styles.tableWrapper}>
      <Table
        columns={columns}
        data={userList as User[]}
        highlightedRows={[userIndex]}
        onRowSelect={handleRowSelection}
      />
    </div>
  );
};

export default UserListTable;
