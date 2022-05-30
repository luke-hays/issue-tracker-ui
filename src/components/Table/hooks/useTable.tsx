import { useState, useMemo } from 'react';
import { rowType } from '../interfaces/table.interface';

type sortType = {
  order: string;
  orderBy: string;
};

const filterRows = (rows: rowType[], filters: object): rowType[] => {
  if (!filters) return rows;

  return rows.filter((row: rowType) => {
    return Object.keys(filters).every((accessor) => {
      const value = row[accessor as keyof typeof row] as any;
      const searchValue = filters[accessor as keyof typeof filters];
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

const sortRows = (rows: rowType[], sort: sortType): rowType[] => {
  return rows.sort((a: rowType, b: rowType) => {
    const { order, orderBy } = sort;

    if (!a[orderBy as keyof typeof a]) return 1;
    if (!b[orderBy as keyof typeof b]) return -1;

    const aLocale = a[orderBy as keyof typeof a].toString();
    const bLocale = b[orderBy as keyof typeof b].toString();

    if (order === 'asc') {
      return aLocale.localeCompare(bLocale, 'en', {
        numeric: typeof b[orderBy as keyof typeof b] === 'number',
      });
    }
    return bLocale.localeCompare(aLocale, 'en', {
      numeric: typeof a[orderBy as keyof typeof a] === 'number',
    });
  });
};

const paginateRows = (
  sortedRows: rowType[],
  activePage: number,
  rowsPerPage: number
): rowType[] => {
  return [...sortedRows].slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );
};

const useTable = (rows: rowType[]): any => {
  const [activePage, setActivePage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' });

  // Order:
  // Filter
  const filteredRows = useMemo(
    () => filterRows(rows, filters),
    [rows, filters]
  );

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  // Sort
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );

  // Paginate
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  // Event Handlers
  const handleSearch = (value: string, accessor: string): void => {
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

  return [
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
  ];
};

export default useTable;
