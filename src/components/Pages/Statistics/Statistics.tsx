import { FC, useCallback, useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdQuiz } from "react-icons/md";
import { AiFillTrophy } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";

import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/user/selectors";
import styles from "./statistics.module.scss";
import { User } from "../../../redux/user/types";
import UserStatistics from "./UserStatusticts";
import Filters from "./Filters";
import { FilterValue } from "./Filters/Filters";
import { getUserPage } from "../../../api/requests";
import {
  useGetStatisticsDataQuery,
  useGetUserListQuery,
} from "../../../redux/apiSlice";
import Table from "../../UI/Table";
import { columns } from "./columns";
import InfoBlock from "../../UI/InfoBlock";
import Pagination from "../../UI/Pagination";
import Loader from "../../UI/Loader";
import Modal from "../../UI/Modal";
import PageTitle from "../../UI/PageTitle";

const Statistics: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [filterValue, setFilterValue] = useState<FilterValue>("score");
  const [findMeChecked, setFindMeChecked] = useState<boolean>(false);
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const currentUser = useAppSelector(selectCurrentUser);

  const {
    data: statisticsData,
    isLoading,
    isSuccess,
  } = useGetStatisticsDataQuery();

  const {
    data: userList,
    isFetching,
    isSuccess: isSuccessFetchingUsers,
  } = useGetUserListQuery({
    page,
    orderBy: filterValue,
  });

  useEffect(() => {
    if (findMeChecked && currentUser) {
      getUserPage(currentUser, { orderBy: filterValue }).then((data) =>
        setPage(data.page)
      );
    } else {
      setPage(0);
    }
  }, [findMeChecked, filterValue]);

  const handleFilterChange = (filterValue: FilterValue) => {
    setFilterValue(filterValue);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFindMeChecked(checked);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const handleRowSelection = (rowIndex: number) => {
    const user = userList?.data[rowIndex];
    if (user) {
      setModalOpened(true);
      setSelectedUser(user);
    }
  };

  const getUserIndex = useCallback(() => {
    const user = userList?.data.find((u) => u.id === currentUser?.id);
    if (user) {
      return userList?.data.indexOf(user) ?? -1;
    }
    return -1;
  }, [userList, currentUser]);

  return (
    <div className={`${styles.statisticsBody} container`}>
      <div className={styles.header}>
        <div>
          <PageTitle>Statistics</PageTitle>
          <h4 className={styles.subtitle}>Be the best among the rest!</h4>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          isSuccess && (
            <>
              <div className={styles.blockContainer}>
                <InfoBlock
                  label={`${statisticsData.userCount} Users`}
                  icon={<BsFillPersonFill />}
                />
                <InfoBlock
                  label={`${statisticsData.totalGames} Games`}
                  icon={<MdQuiz />}
                />
                <InfoBlock
                  label={`${statisticsData.totalScore} Average score`}
                  icon={<AiFillTrophy />}
                />
              </div>
              <div className="position-relative mt-4 w-100">
                <div className={styles.userInfo}>
                  Winner:
                  <span>{statisticsData.winner.email}</span>
                </div>
                <Filters
                  filterValue={filterValue}
                  checked={findMeChecked}
                  onFilterChange={handleFilterChange}
                  onCheckboxChange={handleCheckboxChange}
                />
              </div>
            </>
          )
        )}
      </div>
      {isFetching ? (
        <Loader />
      ) : (
        isSuccessFetchingUsers && (
          <>
            <div className={styles.tableWrapper}>
              <Table
                columns={columns}
                data={userList.data}
                highlightedRows={[getUserIndex()]}
                onRowSelect={handleRowSelection}
              />
            </div>
            <Pagination
              pageCount={userList.totalPages}
              forcePage={page}
              onPageChange={(page) => setPage(page)}
            />
          </>
        )
      )}
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
          {!!selectedUser && (
            <UserStatistics onClose={closeModal} user={selectedUser} />
          )}
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default Statistics;
