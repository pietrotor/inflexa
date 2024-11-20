import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'
import { edunoClient } from '@/lib/axios'
import { userQueryKeys } from './query-keys'
import { User } from '../types'
import { PaginationResponse } from '@/types'
import { PaginationValues } from '@/hooks'

interface GetUsersPaginatedProps {
  pagination: Omit<PaginationValues, 'query'>
}

function getUsers({
  pagination
}: GetUsersPaginatedProps): Promise<PaginationResponse<User>> {
  return edunoClient
    .get('/api/v1/auth/users', {
      params: {
        limit: pagination.rowsPerPage,
        page: pagination.currentPage,
        filter: pagination.querySearch
      }
    })
    .then(({ data }) => data)
}

type QueryFnType = typeof getUsers

interface UseUsersParams {
  config?: QueryConfig<QueryFnType>
  pagination: PaginationValues
}

function useUsers({
  config = {},
  pagination: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query,
    ...pagination
  }
}: UseUsersParams) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    refetchOnMount: true,
    placeholderData: keepPreviousData,
    queryKey: userQueryKeys.paginated([...Object.values(pagination)]),
    queryFn: () => {
      return getUsers({ pagination })
    }
  })
}

export { getUsers, useUsers }
