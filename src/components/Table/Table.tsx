/* eslint-disable @typescript-eslint/no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortUp,
  faSort,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';

import { TableProps, rowType } from './interfaces/table.interface';
import useTable from './hooks/useTable';
import Pagination from './Pagination';

const Table = ({ rows, columns }: TableProps): JSX.Element => {
  const [
    activePage,
    setActivePage,
    count,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    filters,
    calculatedRows,
    sort,
    handleSort,
    handleSearch,
  ] = useTable(rows);

  return (
    <div>
      {count === 0 ? <div>No Data to Display</div> : ''}
      <table className="border-solid border w-fit">
        <thead>
          <tr>
            {columns.map((column) => {
              const sortIcon = (): JSX.Element => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === 'asc') {
                    return <FontAwesomeIcon icon={faSortUp} />;
                  }
                  return <FontAwesomeIcon icon={faSortDown} />;
                }
                return <FontAwesomeIcon icon={faSort} />;
              };

              return (
                <th
                  key={column.accessor}
                  className="border-solid border border-orange-100"
                >
                  <span>{column.label}</span>
                  <button
                    type="button"
                    onClick={() => handleSort(column.accessor)}
                  >
                    {sortIcon()}
                  </button>
                </th>
              );
            })}
          </tr>
          <tr>
            {columns.map((column) => {
              return (
                <th className="border-solid border border-orange-100">
                  <input
                    key={`${column.accessor}-search`}
                    type="search"
                    placeholder={`Search ${column.label}`}
                    value={filters[column.accessor as keyof typeof filters]}
                    onChange={(event) =>
                      handleSearch(event.target.value, column.accessor)
                    }
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row: rowType) => {
            return (
              <tr
                key={row.id}
                className="border-solid border border-orange-100"
              >
                {columns.map((column) => {
                  if (column.format) {
                    return (
                      <td
                        key={column.accessor}
                        className="border-solid border border-orange-100"
                      >
                        {column.format(
                          Boolean(row[column.accessor as keyof rowType])
                        )}
                      </td>
                    );
                  }
                  return (
                    <td
                      key={column.accessor}
                      className="border-solid border border-orange-100"
                    >
                      {row[column.accessor as keyof rowType]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        activePage={activePage}
        count={count}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
    </div>
  );
};

export default Table;
