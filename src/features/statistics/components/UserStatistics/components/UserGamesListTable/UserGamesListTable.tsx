import { FC } from "react";


import { createSearchParams, useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectSelectedUser,
  selectUserGamesList,
} from "../../../../services/selectors";

import Table from "../../../../../../components/UI/Table";
import { Game } from "../../../../../quiz/services/types";
import { User } from "../../../../../../types/types";

import styles from "./userGamesListTable.module.scss";

export const columns = [
  {
    Header: "Game",
    accessor: "date",
    className: "text-center",
  },
  {
    Header: "Score",
    accessor: "score",
    className: "text-center",
  },
];

const UserGamesListTable: FC = () => {
  const userGamesList = useAppSelector(selectUserGamesList);
  const user = useAppSelector(selectSelectedUser) as User;
  const navigate = useNavigate();

  const handleRowSelection = (rowIndex: number) => {
    const game = userGamesList?.[rowIndex];
    if (game) {
      navigate({
        pathname: "/results",
        search: `?${createSearchParams({
          userId: user.id,
          gameId: game.id,
        })}`,
      });
    }
  };

  return (
    <div className={styles.tableWrapper}>
      <Table
        columns={columns}
        data={userGamesList as Game[]}
        onRowSelect={handleRowSelection}
      />
    </div>
  );
};

export default UserGamesListTable;
