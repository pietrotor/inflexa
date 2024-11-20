import { NameField } from './Fields'
import { useUserForm } from './hooks/useUserForm'

export const UserForm = () => {
  const { form } = useUserForm()
  return (
    <form className="w-full space-y-2">
      <NameField form={form} />
    </form>
  )
}
