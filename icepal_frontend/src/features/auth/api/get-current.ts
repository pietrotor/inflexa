import { useQuery } from '@tanstack/react-query'

import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'
import { edunoClient } from '@/lib/axios'
import { CurrentSession } from '../types'
import { loginQueryKeys } from './query-keys'

function getCurrent(): Promise<CurrentSession> {
  return edunoClient.get('/api/v1/auth/current').then(({ data }) => data)
}

type QueryFnType = typeof getCurrent

interface UseCurrentParams {
  config?: QueryConfig<QueryFnType>
}

function useCurrent({ config = {} }: UseCurrentParams) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: loginQueryKeys.session,
    queryFn: () => {
      return getCurrent()
    }
  })
}

export { getCurrent, useCurrent }
