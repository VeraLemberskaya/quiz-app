import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";

import styles from "./userStatistics.module.scss";
import { User } from "../../../../redux/user/types";
import { useAppDispatch } from "../../../../redux/hooks";
import { setCurrentQuiz } from "../../../../redux/quiz/slice";
import { useGetUserGamesListQuery } from "../../../../redux/apiSlice";
import Table from "../../../UI/Table";
import { columns } from "./columns";
import Pagination from "../../../UI/Pagination";
import Button from "../../../UI/Button";
import Loader from "../../../UI/Loader";

type Props = {
  user: User;
  onClose?: () => void;
};

const UserStatisticsModal: FC<Props> = ({ user, onClose }) => {
  const [page, setPage] = useState<number>(0);
  const {
    data: userGamesList,
    isFetching,
    isSuccess,
  } = useGetUserGamesListQuery({ id: user.id, page });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRowSelection = (rowIndex: number) => {
    const game = userGamesList?.data[rowIndex];
    if (game) {
      dispatch(setCurrentQuiz(game.quiz, game.answers));
      navigate("/results", {
        state: {
          isResultPage: true,
        },
      });
    }
  };

  return (
    <div className={styles.modalBody}>
      <button className={styles.closeBtn} onClick={onClose}>
        <MdOutlineClose />
      </button>
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
          <Pagination
            type="arrow"
            pageCount={userGamesList.totalPages}
            forcePage={page}
            onPageChange={(page) => setPage(page)}
          />
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
