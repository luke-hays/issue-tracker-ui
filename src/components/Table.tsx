import { TableProps, rowType } from 'interfaces/table.interface';

const Table = ({ rows, columns }: TableProps): JSX.Element => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              return <th key={column.accessor}>{column.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
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
    </div>
  );
};

export default Table;
