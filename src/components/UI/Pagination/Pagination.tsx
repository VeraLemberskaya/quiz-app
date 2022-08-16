import classNames from "classnames";
import { FC } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";

type PaginationType = "standart" | "arrow";

type Props = {
  pageCount: number;
  forcePage?: number;
  onPageChange: (page: number) => void;
  type?: PaginationType;
};

const Pagination: FC<Props> = ({
  pageCount,
  forcePage,
  onPageChange,
  type = "standart",
}) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={handlePageChange}
      previousLabel={<MdArrowBackIos />}
      nextLabel={<MdArrowForwardIos />}
      containerClassName={classNames(styles.paginationContainer, {
        [styles.arrow]: type === "arrow",
      })}
      activeLinkClassName={styles.activePageLink}
      pageLinkClassName={styles.pageLink}
      breakLinkClassName={styles.breakLink}
      previousLinkClassName={styles.navLink}
      nextLinkClassName={styles.navLink}
      disabledLinkClassName={styles.disabled}
    />
  );
};

export default Pagination;
