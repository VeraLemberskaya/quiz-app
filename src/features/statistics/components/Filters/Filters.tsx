import { FC, useState } from "react";
import { BsFilterRight } from "react-icons/bs";

import classNames from "classnames";

import Button from "../../../../components/UI/Button";
import Checkbox from "../../../../components/UI/Checkbox";
import { FilterValue } from "../../services/types";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectStatistics } from "../../services/selectors";
import { setFilterValue, setFindMe } from "../../services/slice";
import Select from "../../../../components/UI/Select";
import { useAuth } from "../../../../hooks/useAuth";

import styles from "./filters.module.scss";

const FILTER_VALUES: { [key in FilterValue]: string } = {
  score: "score",
  games: "games",
};

const Filters: FC = () => {
  const { user } = useAuth();

  const [filtersOpened, setFiltersOpened] = useState<boolean>(false);
  const { filterValue, findMe } = useAppSelector(selectStatistics);

  const dispatch = useAppDispatch();

  const handleFilterToggle = () => {
    setFiltersOpened((prevState) => !prevState);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterIcon}>
        <Button buttonType="iconBtn" onClick={handleFilterToggle}>
          <BsFilterRight />
        </Button>
      </div>
      <div
        className={classNames(styles.filterWrapper, {
          [styles.opened]: filtersOpened,
        })}
      >
        {user && (
          <Checkbox
            label="Find me"
            checked={findMe}
            onChange={(event) => {
              dispatch(setFindMe(event.target.checked));
            }}
          />
        )}
        <Select
          label="Sort by:"
          options={Object.keys(FILTER_VALUES)}
          defaultValue={filterValue}
          onSelect={(value) => dispatch(setFilterValue(value as FilterValue))}
        />
      </div>
    </div>
  );
};

export default Filters;
