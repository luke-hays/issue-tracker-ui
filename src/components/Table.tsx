/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import { TableProps, rowType } from 'interfaces/table.interface';

import Pagination from './Pagination';

const Table = ({ rows, columns }: TableProps): JSX.Element => {
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' });

  const filterRows = (rows: any, filters: any): rowType[] => {
    if (!filters) return rows;

    return rows.filter((row: any) => {
      return Object.keys(filters).every((accessor) => {
        const value = row[accessor];
        const searchValue = filters[accessor];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchValue);
        }

        if (typeof value === 'boolean') {
          return (
            (searchValue === 'true' && value) ||
            (searchValue === 'false' && !value)
          );
        }

        if (typeof value === 'number') {
          // eslint-disable-next-line eqeqeq
          return value == searchValue;
        }

        return false;
      });
    });
  };

  const handleSearch = (value: any, accessor: string): any => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[accessor as keyof typeof updatedFilters];

        return updatedFilters;
      });
    }
  };

  const sortRows = (rows: any, sort: any): rowType[] => {
    return rows.sort((a: any, b: any) => {
      const { order, orderBy } = sort;

      if (!a[orderBy]) return 1;
      if (!b[orderBy]) return -1;

      const aLocale = a[orderBy].toString();
      const bLocale = b[orderBy].toString();

      if (order === 'asc') {
        return aLocale.localeCompare(bLocale, 'en', {
          numeric: typeof b[orderBy] === 'number',
        });
      }
      return bLocale.localeCompare(aLocale, 'en', {
        numeric: typeof a[orderBy] === 'number',
      });
    });
  };

  const handleSort = (accessor: string): void => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === 'asc' && prevSort.orderBy === accessor
          ? 'desc'
          : 'asc',
      orderBy: accessor,
    }));
  };

  const paginateRows = (sortedRows: any, activePage: any, rowsPerPage: any) => {
    return [...sortedRows].slice(
      (activePage - 1) * rowsPerPage,
      activePage * rowsPerPage
    );
  };

  const rowsPerPage = 3;

  const filteredRows = useMemo(
    () => filterRows(rows, filters),
    [rows, filters]
  );
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

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
          {calculatedRows.map((row) => {
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
