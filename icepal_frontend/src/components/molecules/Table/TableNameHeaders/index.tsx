// import { Button } from 'ui'
type TableNameHeadersProps = {
  title: string;
  color?: 'light' | 'dark';
  onUpClick?: () => void;
  onDownClick?: () => void;
  isUpPress?: boolean;
  isDownPress?: boolean;
};
const TableNameHeaders = ({
  title,
  color = 'light',
  onUpClick,
  onDownClick,
  isUpPress = false,
  isDownPress = false,
}: TableNameHeadersProps) => {
  return (
    <th
      className={
        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 max-w-sm font-semibold text-left' +
        (color === 'light'
          ? 'bg-sky-50 text-primary-light border-sky-100'
          : 'bg-primary-darken text-blue-white border-blue-500')
      }
    >
      <div className="flex justify-start font-bold gap-1 md:gap-2 items-center">
        {title}
      </div>
    </th>
  );
};

export default TableNameHeaders;
