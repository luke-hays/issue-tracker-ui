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
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              const sortIcon = (): string => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === 'asc') {
                    return '⬆️';
                  }
                  return '⬇️';
                }
                return '️↕️';
              };

              return (
                <th key={column.accessor}>
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
                <th>
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
              <tr key={row.id}>
                {columns.map((column) => {
                  if (column.format) {
                    return (
                      <td key={column.accessor}>
                        {column.format(
                          Boolean(row[column.accessor as keyof rowType])
                        )}
                      </td>
                    );
                  }
                  return (
                    <td key={column.accessor}>
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
