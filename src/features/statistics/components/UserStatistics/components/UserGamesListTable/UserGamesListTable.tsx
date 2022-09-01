import { FC } from "react";
import Table from "../../../../../../components/UI/Table";

import styles from "./userGamesListTable.module.scss";
import { getFormattedTime } from "../../../../../../utils/getFormattedTime";
import { useAppSelector } from "../../../../../../services/hooks";
import {
  selectSelectedUser,
  selectUserGamesList,
} from "../../../../services/selectors";

import { createSearchParams, useNavigate } from "react-router-dom";
import { User } from "../../../../../user/services/types";
import { Game } from "../../../../../quiz/services/types";

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
  {
    Header: "Time",
    accessor: "time",
    Cell: (data: any) => {
      return `${getFormattedTime(data.value.minutes)} : ${getFormattedTime(
        data.value.seconds
      )}` as any;
    },
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
