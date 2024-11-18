import { Typography } from '@material-tailwind/react';

type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  return <Typography variant="h2">{title}</Typography>;
};

export { PageTitle };
