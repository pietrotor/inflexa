import { useLoginController, useLoginForm } from '../../hooks'
import { EmailField, PasswordField } from '../../components'
import { Button, PageLoader } from 'design-system-eduno'
import { useWebConfiguration } from '../../api'
import { routerManager } from '@/routes'
import { AdminRoutesEnum } from '@/utils'

const LoginPage = () => {
  const form = useLoginForm()
  const { onSubmit, loading } = useLoginController()

  const url = window.location.hostname

  const { data, isLoading } = useWebConfiguration({
    params: {
      url
    }
  })

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2">
      <section className="hidden md:!block">
        <img
          src={
            data?.loginBackground ??
            'https://eduno-dev.s3.us-east-2.amazonaws.com/Instituto+Icepal-Edificio.jpg'
          }
          alt="login-image"
          className="h-full w-full object-cover"
        />
      </section>
      <form className="flex h-full min-h-screen w-full items-center justify-center bg-gray-50">
        <div className="w-full max-w-[550px] space-y-12 md:px-10">
          <img
            className="w-full max-w-[400px]"
            src={data?.pathLogo ?? ''}
            alt="logo"
          />
          <h1 className="text-center">Bienvenido</h1>
          <EmailField form={form} />
          <PasswordField form={form} />
          <Button
            isLoading={loading}
            type="submit"
            fullWidth
            onClick={form.handleSubmit(data =>
              onSubmit(data, () =>
                routerManager.to({
                  name: AdminRoutesEnum.USERS
                })
              )
            )}
          >
            Ingresar
          </Button>
        </div>
      </form>
    </main>
  )
}

export { LoginPage }
