import { FC, useState } from "react";
import { BsFilterRight } from "react-icons/bs";

import styles from "./filters.module.scss";
import classNames from "classnames";
import Button from "../../../../components/UI/Button";
import Checkbox from "../../../../components/UI/Checkbox";
import { FilterValue } from "../../services/types";
import { useAppDispatch, useAppSelector } from "../../../../services/hooks";
import { selectStatistics } from "../../services/selectors";
import { setFilterValue, setFindMe } from "../../services/slice";
import Dropdown from "../../../../components/UI/Dropdown";
import { selectCurrentUser } from "../../../user/services/selectors";

const FILTER_VALUES: { [key in FilterValue]: string } = {
  score: "Score",
  games: "Games",
};

const filterValues: { value: FilterValue; label: string }[] = [
  { value: "score", label: FILTER_VALUES.score },
  { value: "games", label: FILTER_VALUES.games },
];

const Filters: FC = () => {
  const user = useAppSelector(selectCurrentUser);

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
        <div className={styles.selectWrapper}>
          Sort by:
          <Dropdown>
            <Dropdown.Toggle>{FILTER_VALUES[filterValue]}</Dropdown.Toggle>
            <Dropdown.Menu>
              {filterValues.map((option) => (
                <Dropdown.Item
                  key={option.value}
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
