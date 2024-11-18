import { XCircleIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';

type ErrorFieldProps = {
  messsage?: string;
};

const ErroField = ({ messsage }: ErrorFieldProps) => {
  if (!messsage) return <></>;
  return (
    <Typography
      variant="paragraph"
      className="!flex gap-[2px] items-center !text-red-500 text-xs font-medium m-0 my-1"
    >
      <XCircleIcon className="text-red-500 w-4 h-4" />
      {messsage}
    </Typography>
  );
};

export { ErroField };
