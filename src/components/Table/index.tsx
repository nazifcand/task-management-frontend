import { FC, ReactNode } from 'react';

interface IColumn {
  title: string;
  value: (row: any) => ReactNode;
}

interface ITable {
  columns: IColumn[];
  data: any[];
}

const Table: FC<ITable> = ({ columns, data }) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {columns.map((col, colIndex) => (
            <th
              key={colIndex}
              className="border text-start px-2 py-1.5 h-[40px] font-semibold text-sm"
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td
                key={colIndex}
                className="border px-2 text-sm py-1.5 h-[30px]"
              >
                {col.value(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
