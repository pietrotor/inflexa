import { useNotifications } from '@/hooks'
import { MutationConfig, queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { edunoClient } from '@/lib/axios'
import { User } from '../types'
import { userQueryKeys } from './query-keys'

export function getUserByEmail(body: { email: string }): Promise<User> {
  return edunoClient
    .post('/api/v1/auth/users/check-email', body)
    .then(({ data }) => {
      return data
    })
}

type MutationFn = typeof getUserByEmail

interface useUserByEmail {
  config?: MutationConfig<MutationFn>
  showNotification?: boolean
}

export function useUserByEmail({
  config,
  showNotification = true
}: useUserByEmail = {}) {
  const { addSuccessNotification } = useNotifications()

  return useMutation({
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all
      })
      if (showNotification) {
        addSuccessNotification('Usuario encontrado.')
      }

      return data
    },
    ...config,
    mutationFn: getUserByEmail
  })
}
