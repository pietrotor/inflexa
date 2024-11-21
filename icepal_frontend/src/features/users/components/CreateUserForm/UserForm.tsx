import { EmailField, LastNameField, NameField, PasswordField } from './Fields'
import { useUserForm } from './hooks/useUserForm'
import { FormActionButtons } from '@/components'
import { UserFormValues } from './validations'
import { User } from '../../types'

type UserFormProps = {
  onSubmit: (data: UserFormValues) => void
  onCancel?: () => void
  isLoading?: boolean
  initialValues?: User
}

export const UserForm = ({
  onSubmit,
  onCancel,
  isLoading,
  initialValues
}: UserFormProps) => {
  const { form, isEditing } = useUserForm({
    initialValues
  })
  return (
    <form className="flex w-full flex-col gap-4">
      <NameField form={form} />
      <LastNameField form={form} />
      <EmailField isEditing={isEditing} form={form} />
      <PasswordField isEditing={isEditing} form={form} />
      <FormActionButtons
        onSubmit={form.handleSubmit(onSubmit)}
        onCancel={onCancel}
        isLoading={isLoading}
        submitText={isEditing ? 'Guardar' : 'Crear'}
      />
    </form>
  )
}
