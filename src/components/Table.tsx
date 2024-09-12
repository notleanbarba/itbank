export default function Table({
  id,
  hidden,
  thead,
  tbody,
  tfoot,
}: {
  id?: string;
  hidden?: boolean;
  thead: string[];
  tbody: string[][];
  tfoot?: string[];
}) {
  return (
    <table
      id={id}
      hidden={hidden}
      className="text-left text-base w-full mb-2 shadow-float"
    >
      <thead className="bg-[#d9d9d999]">
        <tr>
          {thead.map((col) => {
            return (
              <th key={`header_${col}`} className="h-auto p-4 align-middle">
                {col}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tbody.map((row, row_index) => {
          return (
            <tr key={`row_${row_index}`} className="border-t-light">
              {row.map((col, col_index) => {
                return (
                  <td
                    key={`row_${row_index}_col_${col_index}`}
                    className="h-auto p-4 align-middle"
                  >
                    {col}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      {tfoot && (
        <tfoot className="border-t-light bg-[#d9d9d999]">
          <tr>
            {tfoot.map((col, index) => {
              if (index === 0)
                return <th className="h-auto p-4 align-middle">{col}</th>;
              return (
                <td key={`footer_${index}`} className="h-auto p-4 align-middle">
                  {col}
                </td>
              );
            })}
          </tr>
        </tfoot>
      )}
    </table>
  );
}
