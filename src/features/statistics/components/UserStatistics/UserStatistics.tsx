import { FC } from "react";

import { useAppSelector } from "../../../../store/hooks";
import { useGetUserGamesListQuery } from "../../services/slice";

import {
  selectSelectedUser,
  selectUserGamesPage,
} from "../../services/selectors";
import Button from "../../../../components/UI/Button";
import Loader from "../../../../components/UI/Loader";

import { User } from "../../../../types/types";

import UserGamesListTable from "./components/UserGamesListTable";
import UserGamesPagination from "./components/UserGamesPagination";
import styles from "./userStatistics.module.scss";

type Props = {
  onClose: () => void;
};

const UserStatisticsModal: FC<Props> = ({ onClose }) => {
  const page = useAppSelector(selectUserGamesPage);
  const user = useAppSelector(selectSelectedUser) as User;

  const {
    data: userGamesList,
    isFetching,
    isSuccess,
  } = useGetUserGamesListQuery({ id: user.id, page });

  return (
    <div className={styles.modalBody}>
      <div className={styles.header}>
        <div className={styles.title}> {user?.email}</div>
        {/* <div className={styles.subtitle}>
          Total score: <span>{user?.score}</span>
        </div>
        <div className={styles.subtitle}>
          Games played: <span>{user?.totalGames}</span>
        </div> */}
      </div>
      {isFetching ? (
        <Loader />
      ) : isSuccess && userGamesList.data.length ? (
        <div className="position-relative">
          <UserGamesListTable />
          <UserGamesPagination />
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
