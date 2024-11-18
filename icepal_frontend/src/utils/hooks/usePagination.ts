import { useState } from 'react';
import { Pagination } from './usePagination.types';
import { useDebounce } from './useDebounce';

const usePagination = () => {
  const [paginationInput, setPaginationInput] = useState<Pagination>({
    page: 1,
    rows: 20,
    filter: '',
  });

  const handleFilter = (filter: string) => {
    setPaginationInput((state) => ({
      ...state,
      page: 1,
      filter,
    }));
  };

  const changeFilter = useDebounce(handleFilter, 400);

  const nextPage = () => {
    setPaginationInput((state) => ({
      ...state,
      page: state.page + 1,
    }));
  };

  const beforePage = () => {
    setPaginationInput((state) => ({
      ...state,
      page: state.page - 1,
    }));
  };

  const goToPage = (page: number) => {
    setPaginationInput((state) => ({
      ...state,
      page,
    }));
  };

  return {
    paginationInput,
    nextPage,
    beforePage,
    goToPage,
    changeFilter,
  };
};

export { usePagination };
