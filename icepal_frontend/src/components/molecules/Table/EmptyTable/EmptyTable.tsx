import { FaceFrownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';

type EmptyTableProps = {
  onNew?: () => void;
};

const EmptyTable = ({ onNew }: EmptyTableProps) => {
  return (
    <div className="w-full p-6 bg-white flex items-center">
      <div className="flex flex-col gap-3 justify-center items-center w-full max-w-[600px] m-auto">
        <FaceFrownIcon className="md:w-20 md:h-20 w-10 h-10 text-gray-500" />
        <Typography variant="h6" className="text-gray-500">
          Tabla sin registros existentes
        </Typography>
        <Typography variant="paragraph" className="text-gray-500">
          No existe todavía registros, una vez se realice el primer registro
          aparecera la información
        </Typography>
        {onNew && (
          <Button onClick={onNew} size="sm" className="flex items-end gap-1">
            Agregar
            <PlusIcon className="w-4 h-4 stroke-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export { EmptyTable };
