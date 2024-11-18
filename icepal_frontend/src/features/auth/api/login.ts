import { useNotifications } from '@/hooks'
import { MutationConfig } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { Login } from '../types'
import { edunoClient } from '@/lib/axios'

export function login(data: Login): Promise<string> {
  return edunoClient
    .post<{ token: string }>('/api/v1/auth/login', data)
    .then(({ data: { token } }) => {
      return token
    })
}

type MutationFn = typeof login

interface UseLoginQueryParams {
  config?: MutationConfig<MutationFn>
}

export function useLogin({ config }: UseLoginQueryParams = {}) {
  const { addErrorNotification, addSuccessNotification } = useNotifications()

  return useMutation({
    onError(error) {
      addErrorNotification(
        'El correo o la contraseña no son correctos. Por favor, verifica e intenta nuevamente.'
      )
      console.error(error)
    },
    onSuccess(data) {
      addSuccessNotification(
        'Inicio de sesión exitoso. ¡Es genial tenerte de vuelta!'
      )

      return data
    },
    ...config,
    mutationFn: login
  })
}
