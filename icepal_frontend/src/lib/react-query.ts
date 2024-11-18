import {
  DefaultOptions,
  QueryClient,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

const defaultOptions: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: Infinity
  }
}

export const queryClient = new QueryClient({ defaultOptions })

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<
  ReturnType<FnType>
>

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>

export type InfiniteQueryConfig<QueryFnType extends (...args: any) => any> =
  Omit<
    UseInfiniteQueryOptions<ExtractFnReturnType<QueryFnType>>,
    'queryKey' | 'queryFn'
  >

export type MutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
  >
