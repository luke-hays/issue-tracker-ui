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
      <div>
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
        <button
          disabled={activePage === totalPages}
          onClick={onNextClick}
          type="button"
        >
          Next
        </button>
        <button
          disabled={activePage === totalPages}
          onClick={onLastClick}
          type="button"
        >
          Last
        </button>
      </div>
      <div>
        <p>
          {activePage} of {totalPages}
        </p>
        <p>
          Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
