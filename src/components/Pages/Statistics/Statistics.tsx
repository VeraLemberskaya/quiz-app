import React, { FC, useEffect, useRef, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdArrowBackIos, MdArrowForwardIos, MdQuiz } from "react-icons/md";
import { AiFillTrophy } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { CSSTransition } from "react-transition-group";

import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/user/selectors";
import axios from "../../../axios";
import styles from "./statistics.module.scss";
import { User } from "../../../redux/user/types";
import { Loader, Modal } from "../../UI";
import UserStatistics from "./UserStatusticts";

type Data = {
  userCount: number;
  gameCount: number;
  totalScore: number;
  pageCount: number;
  winner: User;
};

const Statistics: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentUsers, setCurrentUsers] = useState<User[] | null>(null);
  const [statisticsData, setStatisticsData] = useState<Data | null>(null);
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    axios.get("statistics").then(({ data }) => {
      setStatisticsData(data);
    });
  }, []);

  useEffect(() => {
    setCurrentUsers(null);
    axios
      .get<User[]>("users", {
        params: {
          page: currentPage,
        },
      })
      .then(({ data: users }) => {
        setCurrentUsers(users);
      });
  }, [currentPage]);

  const handlePageChange = ({ selected: page }: { selected: number }) => {
    setCurrentPage(page);
  };

  const handleUserSelect = (user: User) => {
    setModalOpened(true);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const userRows = currentUsers?.map((user) => (
    <div
      key={user.id}
      className={`${
        currentUser && currentUser.id === user.id ? styles.userRow : ""
      } ${styles.row}`}
      onClick={() => handleUserSelect(user)}
    >
      <div className={`${styles.cell}  ${styles.textEllipsis}`}>
        {user.email}
      </div>
      <div className={`${styles.cell} ${styles.textEnd}`}>{user.gameCount}</div>
      <div className={`${styles.cell} ${styles.textEnd}`}>{user.score}</div>
    </div>
  ));

  return !statisticsData ? (
    <Loader />
  ) : (
    <div className={`${styles.statisticsBody} container`}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Statistics</h1>
          <h4 className={styles.subtitle}>Be the best among the rest!</h4>
        </div>
        <div className={styles.blockContainer}>
          <div className={styles.headerBlock}>
            <span> {statisticsData.userCount}</span>
            Users
            <BsFillPersonFill />
          </div>
          <div className={styles.headerBlock}>
            <span> {statisticsData.gameCount}</span>
            Games
            <MdQuiz />
          </div>
          <div className={styles.headerBlock}>
            <span>{statisticsData.totalScore}</span>
            Average score
            <AiFillTrophy />
          </div>
        </div>
        <div className={styles.userInfo}>
          Winner:
          <span onClick={() => handleUserSelect(statisticsData.winner)}>
            {statisticsData.winner.email}
          </span>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <div className={`${styles.tableHeader} ${styles.row}`}>
          <div className={`${styles.cell}`}>Email</div>
          <div className={`${styles.cell} ${styles.textEnd}`}>Games</div>
          <div className={`${styles.cell} ${styles.textEnd}`}>Total score</div>
        </div>
        <div className={styles.table}>
          {!currentUsers ? <Loader /> : userRows}
        </div>
        <ReactPaginate
          pageCount={statisticsData ? statisticsData.pageCount : 0}
          initialPage={0}
          onPageChange={handlePageChange}
          previousLabel={<MdArrowBackIos />}
          nextLabel={<MdArrowForwardIos />}
          containerClassName={styles.paginationContainer}
          activeLinkClassName={styles.activePageLink}
          pageLinkClassName={styles.pageLink}
          breakLinkClassName={styles.breakLink}
          previousLinkClassName={styles.navLink}
          nextLinkClassName={styles.navLink}
          disabledLinkClassName={styles.disabled}
        />
      </div>
      <CSSTransition
        in={modalOpened}
        timeout={200}
        classNames={{
          enter: styles.fadeEnter,
          enterActive: styles.fadeEnterActive,
          exit: styles.fadeExit,
          exitActive: styles.fadeExitActive,
        }}
        mountOnEnter
        unmountOnExit
      >
        <Modal onOverlayClick={closeModal}>
          <UserStatistics onClose={closeModal} user={selectedUser} />
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default Statistics;
