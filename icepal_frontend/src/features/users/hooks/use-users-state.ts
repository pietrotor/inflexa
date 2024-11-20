import { useDisclosure, usePagination } from '@/hooks'
import { useUsers } from '@/features/users'
import { useCallback } from 'react'

const useUsersState = () => {
  const { filters, values } = usePagination()

  const disclosure = useDisclosure()

  const { onChangePage, onChangeQuery, onChangeRows } = filters

  const { currentPage, offset, query, rowsPerPage, sortBy, querySearch } =
    values

  const { data, isLoading, isFetching } = useUsers({
    pagination: {
      currentPage,
      offset,
      query,
      rowsPerPage,
      sortBy,
      querySearch
    }
  })

  const handleCreateUser = useCallback(() => {
    disclosure.onOpen()
  }, [disclosure])

  return {
    data,
    isLoading,
    isFetching,
    pagination: {
      onChangePage,
      onChangeRows,
      currentPage,
      rowsPerPage,
      total: data?.total || 0
    },
    search: {
      onSearch: onChangeQuery,
      query: querySearch
    },
    handleCreateUser,
    disclosure
  }
}

export { useUsersState }
