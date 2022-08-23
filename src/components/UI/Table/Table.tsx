import classNames from "classnames";
import { FC, useMemo } from "react";
import { Column, useTable } from "react-table";

import styles from "./table.module.scss";

type Props = {
  columns: readonly Column<{}>[];
  data: readonly {}[];
  onRowSelect?: (rowIndex: number) => void;
  highlightedRows?: number[];
};

const Table: FC<Props> = ({ columns, data, onRowSelect, highlightedRows }) => {
  const columnData = useMemo(() => columns, [columns]);
  const rowData = useMemo(() => data, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columnData,
      data: rowData,
    });

  const handleRowSelect = (rowIndex: number) => {
    if (onRowSelect) {
      onRowSelect(rowIndex);
    }
  };

  return (
    <table className={styles.table} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th
                {...column.getHeaderProps({
                  className: column.className,
                })}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={styles.tableBody} {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps({
                className: classNames({
                  [styles.highlightedRow]: highlightedRows?.includes(row.index),
                  [styles.cursorPoiner]: onRowSelect,
                }),
              })}
              onClick={() => handleRowSelect(row.index)}
            >
              {row.cells.map((cell: any) => (
                <td
                  {...cell.getCellProps({ className: cell.column.className })}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
