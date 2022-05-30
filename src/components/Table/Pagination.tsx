import { useState, useEffect } from 'react';

interface paginationProps {
  activePage: number;
  count: number;
  rowsPerPage: number;
  totalPages: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  activePage,
  count,
  rowsPerPage,
  totalPages,
  setActivePage,
}: paginationProps): JSX.Element => {
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    setHasData(count > 0);
  }, [count]);

  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;

  const onFirstClick = (): void => {
    setActivePage(1);
  };

  const onPreviousClick = (): void => {
    setActivePage(activePage - 1);
  };

  const onNextClick = (): void => {
    setActivePage(activePage + 1);
  };

  const onLastClick = (): void => {
    setActivePage(totalPages);
  };

  return (
    <div>
      <div className="flex justify-around">
        <button
          disabled={activePage === 1}
          onClick={onFirstClick}
          type="button"
        >
          First
        </button>
        <button
          disabled={activePage === 1}
          onClick={onPreviousClick}
          type="button"
        >
          Previous
        </button>
        <p>
          {activePage} of {totalPages}
        </p>
        <button
          disabled={activePage === totalPages || totalPages <= 1}
          onClick={onNextClick}
          type="button"
        >
          Next
        </button>
        <button
          disabled={activePage === totalPages || totalPages <= 1}
          onClick={onLastClick}
          type="button"
        >
          Last
        </button>
      </div>
      {hasData ? (
        <div className="flex justify-end">
          <p>
            Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
          </p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Pagination;
