import { useNotifications } from '@/hooks'
import { MutationConfig, queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { edunoClient } from '@/lib/axios'
import { CreateUserDto, User } from '../types'
import { userQueryKeys } from './query-keys'

export function createUser(data: CreateUserDto): Promise<User> {
  return edunoClient.post('/api/v1/auth/register', data).then(({ data }) => {
    return data
  })
}

type MutationFn = typeof createUser

interface UseCreateUserParams {
  config?: MutationConfig<MutationFn>
  showNotification?: boolean
}

export function useCreateUser({
  config,
  showNotification = true
}: UseCreateUserParams = {}) {
  const { addErrorNotification, addSuccessNotification } = useNotifications()

  return useMutation({
    onError(error) {
      addErrorNotification(
        'No se pudo crear el usuario, por favor intenta nuevamente.'
      )
      console.error(error)
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all
      })
      if (showNotification) {
        addSuccessNotification('Usuario creado correctamente')
      }

      return data
    },
    ...config,
    mutationFn: createUser
  })
}
