import { FC, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdQuiz } from "react-icons/md";
import { AiFillTrophy } from "react-icons/ai";

import styles from "./statistics.module.scss";

import InfoBlock from "../../components/UI/InfoBlock";
import Loader from "../../components/UI/Loader";
import Modal from "../../components/UI/Modal";
import PageTitle from "../../components/UI/PageTitle";
import FadeTransition from "../../components/Utils/FadeTransition";
import Filters from "../../features/statistics/components/Filters";
import UserListPagination from "../../features/statistics/components/UserListPagination";
import UserListTable from "../../features/statistics/components/UserListTable/UserListTable";
import UserStatistics from "../../features/statistics/components/UserStatistics";
import { usePageReset } from "../../features/statistics/hooks/usePageReset";
import { selectStatistics } from "../../features/statistics/services/selectors";
import {
  useGetStatisticsDataQuery,
  useGetUserListQuery,
} from "../../features/statistics/services/slice";
import { useAppSelector } from "../../services/hooks";
import Button from "../../components/UI/Button";
import StatisticsCharts from "../../features/statistics/components/StatisticsCharts";

const Statistics: FC = () => {
  const { usersPage: page, filterValue } = useAppSelector(selectStatistics);
  usePageReset();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [chartsModalOpened, setChartsModalOpened] = useState<boolean>(false);

  const {
    data: statisticsData,
    isLoading,
    isSuccess,
  } = useGetStatisticsDataQuery();

  const { isFetching, isSuccess: isSuccessFetchingUsers } = useGetUserListQuery(
    {
      page,
      orderBy: filterValue,
    }
  );

  const closeModal = () => {
    setModalOpened(false);
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
                <Filters />
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
            <UserListTable onRowSelect={() => setModalOpened(true)} />
            <UserListPagination />
          </>
        )
      )}
      <FadeTransition inProp={modalOpened} timeout={200} styles={styles}>
        <Modal onClose={closeModal}>
          <UserStatistics onClose={closeModal} />
        </Modal>
      </FadeTransition>
      <FadeTransition inProp={chartsModalOpened} timeout={200} styles={styles}>
        <Modal onClose={() => setChartsModalOpened(false)}>
          <StatisticsCharts />
        </Modal>
      </FadeTransition>
      <Button onClick={() => setChartsModalOpened(true)}>View charts</Button>
    </div>
  );
};

export default Statistics;
