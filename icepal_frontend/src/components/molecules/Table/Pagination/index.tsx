import { PaginationInterfaceProps } from '@/types';
import { Button } from '@material-tailwind/react';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onChangePage = () => {},
}: PaginationInterfaceProps) => {
  return (
    <div className="w-full">
      <div className="flex gap-4 items-center justify-center md:justify-start">
        <Button
          className="py-1 px-2 hidden md:block"
          disabled={currentPage === 1}
          onClick={() => onChangePage(currentPage - 1)}
        >
          <div className="flex gap-1 items-center">
            <p>Anterior</p>
          </div>
        </Button>
        {/* <PaginationNextUi
          radius="md"
          size="lg"
          variant="faded"
          total={totalPages || 1}
          siblings={1}
          initialPage={1}
          page={currentPage}
          onChange={(page) => onChangePage(page)}
        /> */}
        <Button
          className="py-1 px-2 hidden md:block"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onChangePage(currentPage + 1)}
        >
          <div className="flex gap-1 items-center">
            <p>Siguiente</p>
          </div>
        </Button>
      </div>
      <div className="w-full flex md:hidden gap-4 items-center mt-4 justify-center">
        <Button
          className="py-1 px-2"
          disabled={currentPage === 1}
          onClick={() => onChangePage(currentPage - 1)}
        >
          <div className="flex gap-1 items-center">
            <p>Anterior</p>
          </div>
        </Button>
        <Button
          className="py-1 px-2"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onChangePage(currentPage + 1)}
        >
          <div className="flex gap-1 items-center">
            <p>Siguiente</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
