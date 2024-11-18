import { useQuery } from '@tanstack/react-query'

import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'
import { edunoClient } from '@/lib/axios'
import { WebConfiguration } from '../types'

type Params = {
  url: string
}

function getWebConfiguration({ url }: Params): Promise<WebConfiguration> {
  return edunoClient
    .get('/api/v1/institutes/web-configuration/' + url)
    .then(({ data }) => data)
}

type QueryFnType = typeof getWebConfiguration

interface UseWebConfigurationParams {
  config?: QueryConfig<QueryFnType>
  params: Params
}

function useWebConfiguration({
  config = {},
  params
}: UseWebConfigurationParams) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [],
    queryFn: () => {
      return getWebConfiguration({
        url: params.url
      })
    }
  })
}

export { getWebConfiguration, useWebConfiguration }
