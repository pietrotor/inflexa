import { useQuery } from '@tanstack/react-query'

import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'
import { edunoClient } from '@/lib/axios'
import { userQueryKeys } from './query-keys'
import { User } from '../types'

function getUsers(): Promise<User[]> {
  return edunoClient.get('/api/v1/users').then(({ data }) => data)
}

type QueryFnType = typeof getUsers

interface UseUsersParams {
  config?: QueryConfig<QueryFnType>
}

function useUsers({ config = {} }: UseUsersParams) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: userQueryKeys.all,
    queryFn: () => {
      return getUsers()
    }
  })
}

export { getUsers, useUsers }
