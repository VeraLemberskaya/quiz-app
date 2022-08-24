import { FC, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdQuiz } from "react-icons/md";
import { AiFillTrophy } from "react-icons/ai";

import styles from "./statistics.module.scss";
import { User } from "../../../redux/user/types";
import UserStatistics from "./UserStatusticts";
import Filters from "./Filters";
import Table from "../../UI/Table";
import { columns } from "./columns";
import InfoBlock from "../../UI/InfoBlock";
import Loader from "../../UI/Loader";
import Modal from "../../UI/Modal";
import PageTitle from "../../UI/PageTitle";
import FadeTransition from "../../Utils/FadeTransition";
import { useFilters, useUserIndex } from "./hooks";
import {
  useGetStatisticsDataQuery,
  useGetUserListQuery,
} from "../../../redux/statistics/slice";
import { useAppSelector } from "../../../redux/hooks";
import { selectStatistics } from "../../../redux/statistics/selectors";
import UserListPagination from "./UserListPagination";

const Statistics: FC = () => {
  const {
    usersPage: page,
    filterValue,
    findMe: findMeChecked,
  } = useAppSelector(selectStatistics);
  const { handleFilterValueChange, handleFindMeChange } = useFilters();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  const userIndex = useUserIndex(userList?.data);

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
                  onFilterChange={handleFilterValueChange}
                  onCheckboxChange={handleFindMeChange}
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
                highlightedRows={[userIndex]}
                onRowSelect={handleRowSelection}
              />
            </div>
            <UserListPagination pageCount={userList.totalPages} />
          </>
        )
      )}
      <FadeTransition inProp={modalOpened} timeout={200} styles={styles}>
        <Modal onClose={closeModal}>
          {!!selectedUser && <UserStatistics user={selectedUser} />}
        </Modal>
      </FadeTransition>
    </div>
  );
};

export default Statistics;
