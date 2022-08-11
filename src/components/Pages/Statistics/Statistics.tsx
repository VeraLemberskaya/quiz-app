import { FC, useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdArrowBackIos, MdArrowForwardIos, MdQuiz } from "react-icons/md";
import { AiFillTrophy } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { CSSTransition } from "react-transition-group";

import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/user/selectors";
import styles from "./statistics.module.scss";
import { User } from "../../../redux/user/types";
import { Loader, Modal, PageTitle } from "../../UI";
import UserStatistics from "./UserStatusticts";
import Filters from "./Filters";
import { FilterValue } from "./Filters/Filters";
import { getStatistics, getUserPage, getUsers } from "../../../api/requests";

type Data = {
  userCount: number;
  totalGames: number;
  totalScore: number;
  winner: User;
};

const Statistics: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentUsers, setCurrentUsers] = useState<User[] | null>(null);
  const [statisticsData, setStatisticsData] = useState<Data | null>(null);
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterValue, setFilterValue] = useState<FilterValue>("score");
  const [findMeChecked, setFindMeChecked] = useState<boolean>(false);

  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    getStatistics().then((data) => setStatisticsData(data));
  }, []);

  useEffect(() => {
    setCurrentUsers(null);
    getUsers({
      page: currentPage,
      orderBy: filterValue,
    }).then((data) => {
      setCurrentUsers(data.data);
      setPageCount(data.pageCount);
    });
  }, [currentPage, filterValue]);

  useEffect(() => {
    if (findMeChecked && currentUser) {
      getUserPage(currentUser, { orderBy: filterValue }).then((data) =>
        setCurrentPage(data.page)
      );
    } else {
      setCurrentPage(0);
    }
  }, [findMeChecked, filterValue]);

  const handlePageChange = ({ selected: page }: { selected: number }) => {
    setCurrentPage(page);
  };

  const handleUserSelect = (user: User) => {
    setModalOpened(true);
    setSelectedUser(user);
  };

  const handleFilterChange = (filterValue: FilterValue) => {
    setFilterValue(filterValue);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFindMeChecked(checked);
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
      <div className={`${styles.cell} ${styles.textEnd}`}>
        {user.totalGames}
      </div>
      <div className={`${styles.cell} ${styles.textEnd}`}>{user.score}</div>
    </div>
  ));

  return !statisticsData ? (
    <Loader />
  ) : (
    <div className={`${styles.statisticsBody} container`}>
      <div className={styles.header}>
        <div>
          <PageTitle>Statistics</PageTitle>
          <h4 className={styles.subtitle}>Be the best among the rest!</h4>
        </div>
        <div className={styles.blockContainer}>
          <div className={styles.headerBlock}>
            <span> {statisticsData.userCount}</span>
            Users
            <BsFillPersonFill />
          </div>
          <div className={styles.headerBlock}>
            <span> {statisticsData.totalGames}</span>
            Games
            <MdQuiz />
          </div>
          <div className={styles.headerBlock}>
            <span>{statisticsData.totalScore}</span>
            Average score
            <AiFillTrophy />
          </div>
        </div>
        <div className="position-relative mt-4 w-100">
          <div className={styles.userInfo}>
            Winner:
            <span onClick={() => handleUserSelect(statisticsData.winner)}>
              {statisticsData.winner.email}
            </span>
          </div>
          <Filters
            filterValue={filterValue}
            checked={findMeChecked}
            onFilterChange={handleFilterChange}
            onCheckboxChange={handleCheckboxChange}
          />
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
          pageCount={pageCount}
          initialPage={0}
          forcePage={currentPage}
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
