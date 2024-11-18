type TableLoaderType = {
  columns?: number;
  rows?: number;
};
const TableLoader = ({ columns = 5, rows = 5 }: TableLoaderType) => {
  const buildRow = () => {
    const skeleton = [];
    for (let i = 0; i < columns; i++) {
      skeleton.push(
        <td
          key={i}
          className="whitespace-nowrap border-l-0 border-r-0 border-t-0 px-6  py-3 align-middle"
        >
          <div className="h-5 rounded-md bg-gray-200"></div>
        </td>
      );
    }
    return skeleton;
  };
  return (
    <>
      {Array(rows)
        .fill(0)
        .map((_, index) => (
          <tr key={index} className="animate-pulse">
            {buildRow()}
          </tr>
        ))}
    </>
  );
};

export default TableLoader;
