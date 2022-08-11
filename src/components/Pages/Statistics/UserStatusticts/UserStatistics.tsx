import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdOutlineClose,
} from "react-icons/md";
import { BiMedal } from "react-icons/bi";
import ReactPaginate from "react-paginate";

import styles from "../statistics.module.scss";
import { User } from "../../../../redux/user/types";
import { Button, Loader } from "../../../UI";
import { Game } from "../../../../redux/quiz/types";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setCurrentQuiz } from "../../../../redux/quiz/slice";
import { selectSelectedQuestionAmount } from "../../../../redux/settings/selectors";
import { getUserGames } from "../../../../api/requests";

type Props = {
  user: User | null;
  onClose?: () => void;
};

const UserStatisticsModal: FC<Props> = ({ user, onClose }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [userGames, setUserGames] = useState<Game[] | null>(null);
  const QUESTIONS_NUMBER = useAppSelector(selectSelectedQuestionAmount);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      getUserGames(user, { page: currentPage }).then((data) => {
        setUserGames(data.data);
        setPageCount(data.pageCount);
      });
    }
  }, [currentPage]);

  const handlePageChange = ({ selected: page }: { selected: number }) => {
    setCurrentPage(page);
  };

  const handleGameSelect = (game: Game) => {
    if (user) {
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
      {!userGames ? (
        <Loader />
      ) : userGames.length ? (
        <div className={styles.modalTable}>
          <div className={styles.tableWrapper}>
            <div className={`${styles.tableHeader} ${styles.rowTwoCol}`}>
              <div className={`${styles.cell} ${styles.textCenter}`}>Game</div>
              <div className={`${styles.cell} ${styles.textCenter}`}>Score</div>
            </div>
            <div className={styles.table}>
              {userGames.map((game) => {
                return (
                  <div
                    className={`${styles.row} ${styles.rowTwoCol}`}
                    key={game.id}
                    onClick={() => handleGameSelect(game)}
                  >
                    <div className={`${styles.cell} ${styles.textCenter}`}>
                      {game.score === QUESTIONS_NUMBER && (
                        <span className={styles.icon}>
                          <BiMedal />
                        </span>
                      )}
                      {game.date}
                    </div>
                    <div className={`${styles.cell} ${styles.textCenter}`}>
                      {game.score}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <ReactPaginate
            pageCount={pageCount}
            initialPage={0}
            onPageChange={handlePageChange}
            previousLabel={<MdArrowBackIos />}
            nextLabel={<MdArrowForwardIos />}
            containerClassName={styles.paginationContainer}
            activeLinkClassName={styles.activePageLink}
            pageLinkClassName={styles.pageLink}
            previousLinkClassName={styles.navLink}
            nextLinkClassName={styles.navLink}
            disabledLinkClassName={styles.disabled}
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
