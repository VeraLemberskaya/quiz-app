import { FC } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./userStatistics.module.scss";
import { useAppSelector } from "../../../../redux/hooks";
import { User } from "../../../../redux/user/types";
import Table from "../../../UI/Table";
import { columns } from "./columns";
import Button from "../../../UI/Button";
import Loader from "../../../UI/Loader";
import { useGetUserGamesListQuery } from "../../../../redux/statistics/slice";
import UserStatisticsPagination from "./UserStatisticsPagination";
import { selectUserGamesPage } from "../../../../redux/statistics/selectors";

type Props = {
  user: User;
  onClose?: () => void;
};

const UserStatisticsModal: FC<Props> = ({ user, onClose }) => {
  const page = useAppSelector(selectUserGamesPage);
  const {
    data: userGamesList,
    isFetching,
    isSuccess,
  } = useGetUserGamesListQuery({ id: user.id, page });
  const navigate = useNavigate();

  const handleRowSelection = (rowIndex: number) => {
    const game = userGamesList?.data[rowIndex];
    if (game) {
      navigate(`/results/${user.id}/${game.id}`);
    }
  };

  return (
    <div className={styles.modalBody}>
      <div className={styles.header}>
        <div className={styles.title}> {user?.email}</div>
        <div className={styles.subtitle}>
          Total score: <span>{user?.score}</span>
        </div>
        <div className={styles.subtitle}>
          Games played: <span>{user?.totalGames}</span>
        </div>
      </div>
      {isFetching ? (
        <Loader />
      ) : isSuccess && userGamesList.data.length ? (
        <div className="position-relative">
          <div className={styles.tableWrapper}>
            <Table
              columns={columns}
              data={userGamesList.data}
              onRowSelect={handleRowSelection}
            />
          </div>
          <UserStatisticsPagination pageCount={userGamesList.totalPages} />
        </div>
      ) : (
        <>
          <div className="text-center my-5 fs-2 text-secondary">
            User hasn't completed any quiz yet.
          </div>
          <Button
            className={styles.backBtn}
            buttonType="outlined"
            buttonSize="large"
            onClick={onClose}
          >
            Go back
          </Button>
        </>
      )}
    </div>
  );
};

export default UserStatisticsModal;
