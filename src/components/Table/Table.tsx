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
      <table className="table-auto border-collapse border-solid border border-orange-100 rounded-tl-lg">
        <thead>
          <tr>
            {columns.map((column) => {
              const sortIcon = (): JSX.Element => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === 'asc') {
                    return <FontAwesomeIcon className="pl-2" icon={faSortUp} />;
                  }
                  return <FontAwesomeIcon className="pl-2" icon={faSortDown} />;
                }
                return <FontAwesomeIcon className="pl-2" icon={faSort} />;
              };

              return (
                <th
                  key={column.accessor}
                  className="border-solid border border-orange-100 border-collapse"
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
                <th
                  className="border-solid border border-orange-100 border-collapse"
                  key={`${column.accessor}-th`}
                >
                  <input
                    key={`${column.accessor}-search`}
                    className="w-[10vw] min-w-[-webkit-fill-available] p-1 m-1 rounded-sm bg-zinc-100"
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
                className="border-solid border border-orange-100 border-collapse"
              >
                {columns.map((column) => {
                  if (column.format) {
                    return (
                      <td
                        key={column.accessor}
                        className="border-solid border border-orange-100 px-2 border-collapse"
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
                      className="border-solid border border-orange-100 px-2 border-collapse"
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
