export type columnType = {
  accessor: string;
  label: string;
  format?: (value: boolean) => string;
};

export type rowType = {
  id: number;
};

export interface TableProps {
  rows: Array<rowType>;
  columns: Array<columnType>;
}
