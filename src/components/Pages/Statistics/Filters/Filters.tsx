import { FC, useState } from "react";
import { BsFilterRight } from "react-icons/bs";

import styles from "./filters.module.scss";
import classNames from "classnames";
import Button from "../../../UI/Button";
import Checkbox from "../../../UI/Checkbox";
import { FilterValue } from "../../../../redux/statistics/types";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectStatistics } from "../../../../redux/statistics/selectors";
import { setFilterValue, setFindMe } from "../../../../redux/statistics/slice";
import Dropdown from "../../../UI/Dropdown";

const FILTER_VALUES: { [key in FilterValue]: string } = {
  score: "Score",
  games: "Games",
};

const filterValues: { value: FilterValue; label: string }[] = [
  { value: "score", label: FILTER_VALUES.score },
  { value: "games", label: FILTER_VALUES.games },
];

const Filters: FC = () => {
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
        <Checkbox
          label="Find me"
          checked={findMe}
          onChange={(event) => {
            dispatch(setFindMe(event.target.checked));
          }}
        />
        <div className={styles.selectWrapper}>
          Sort by:
          <Dropdown>
            <Dropdown.Toggle>{FILTER_VALUES[filterValue]}</Dropdown.Toggle>
            <Dropdown.Menu>
              {filterValues.map((option) => (
                <Dropdown.Item
                  onClick={() => dispatch(setFilterValue(option.value))}
                >
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Filters;
