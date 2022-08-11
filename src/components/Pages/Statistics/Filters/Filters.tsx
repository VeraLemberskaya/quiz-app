import React, { FC, useState } from "react";
import { BsFilterRight } from "react-icons/bs";

import styles from "./filters.module.scss";
import { Button, Checkbox, Dropdown } from "../../../UI";
import classNames from "classnames";

export type FilterValue = "score" | "games";

type Props = {
  checked: boolean;
  filterValue: FilterValue;
  onFilterChange: (filterValue: FilterValue) => void;
  onCheckboxChange: (checked: boolean) => void;
};

const FILTER_VALUES: { [key in FilterValue]: string } = {
  score: "Score",
  games: "Games",
};

const Filters: FC<Props> = ({
  checked,
  filterValue,
  onFilterChange,
  onCheckboxChange,
}) => {
  const [filtersOpened, setFiltersOpened] = useState<boolean>(false);

  const handleFilterToggle = () => {
    setFiltersOpened((prevState) => !prevState);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(event.target.checked);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterIcon}>
        <Button buttonType="iconBtn" onClick={handleFilterToggle}>
          <BsFilterRight />
        </Button>
      </div>
      <div
        className={classNames(
          styles.filterWrapper,
          filtersOpened && styles.opened
        )}
      >
        <Checkbox
          label="Find me"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <div className={styles.dropdownWrapper}>
          Sort by:
          <Dropdown>
            <Dropdown.Toggle>{FILTER_VALUES[filterValue]}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onFilterChange("score")}>
                {FILTER_VALUES.score}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onFilterChange("games")}>
                {FILTER_VALUES.games}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Filters;
