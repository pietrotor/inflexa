import { useNotifications } from '@/hooks'
import { MutationConfig, queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { edunoClient } from '@/lib/axios'
import { UpdateUserDto, User } from '../types'
import { userQueryKeys } from './query-keys'

export function updateUser(data: UpdateUserDto): Promise<User> {
  const { _id, ...body } = data
  return edunoClient
    .patch('/api/v1/auth/users/' + _id, body)
    .then(({ data }) => {
      return data
    })
}

type MutationFn = typeof updateUser

interface UseUpdteParams {
  config?: MutationConfig<MutationFn>
  showNotification?: boolean
}

export function useUpdateUser({
  config,
  showNotification = true
}: UseUpdteParams = {}) {
  const { addErrorNotification, addSuccessNotification } = useNotifications()

  return useMutation({
    onError(error) {
      addErrorNotification(
        'El correo o la contraseña no son correctos. Por favor, verifica e intenta nuevamente.'
      )
      console.error(error)
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all
      })
      if (showNotification) {
        addSuccessNotification(
          'Inicio de sesión exitoso. ¡Es genial tenerte de vuelta!'
        )
      }

      return data
    },
    ...config,
    mutationFn: updateUser
  })
}
