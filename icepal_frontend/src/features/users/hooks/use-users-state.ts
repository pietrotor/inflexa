import { useDisclosure, usePagination } from '@/hooks'
import { User, useUserController, useUsers } from '@/features/users'
import { useCallback } from 'react'
import { useCurrentSessionStore } from '@/features/auth'
import { UserFormValues } from '../components/CreateUserForm/validations'

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

  const { loading, onCreateUser, onUpdateUser } = useUserController()

  const { institute } = useCurrentSessionStore()

  const handleCreateUser = useCallback(() => {
    disclosure.onOpen()
  }, [disclosure])

  const handleUpdateUser = useCallback(
    (user: User) => {
      disclosure.onOpen(user)
    },
    [disclosure]
  )

  const submitCallback = () => {
    disclosure.onClose()
  }

  const onHandleSubmit = (data: UserFormValues) => {
    if ((disclosure.data as User)?._id) {
      onUpdateUser(
        {
          _id: (disclosure.data as User)?._id,
          ...data
        },
        submitCallback
      )
    } else {
      onCreateUser(
        {
          ...data,
          password: data.password!,
          instituteId: institute!._id
        },
        submitCallback
      )
    }
  }

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
      query: query
    },
    handleCreateUser,
    disclosure,
    handleUpdateUser,
    isMutating: loading,
    onSubmit: onHandleSubmit
  }
}

export { useUsersState }
