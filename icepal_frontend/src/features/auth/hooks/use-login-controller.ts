import { COOKIE_NAME } from '@/config'
import { useLogin } from '../api'
import { Login } from '../types'
import Cookies from 'universal-cookie'

const useLoginController = () => {
  const cookies = new Cookies()

  const loginMutation = useLogin()

  const onSubmit = (data: Login, callback?: (token: string) => void) => {
    loginMutation.mutateAsync(data).then(token => {
      cookies.set(COOKIE_NAME, token, {
        path: '/', // Ruta donde estará disponible la cookie
        maxAge: 3600 * 24 * 30, // Tiempo en segundos que la cookie será válida (1 hora en este caso)
        secure: true // Si la cookie solo debe ser enviada sobre HTTPS
      })
      callback?.(token)
    })
  }

  return {
    onSubmit,
    loading: loginMutation.isPending,
    hasError: loginMutation.isError
  }
}

export { useLoginController }
