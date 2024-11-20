import { Controller, UseFormReturn } from 'react-hook-form'
import { UserFormValues } from '../validations'
import { Input, Label } from 'design-system-eduno'
import { getFormFieldError } from '@/utils'

const inputName = 'name'

export const NameField = ({
  form
}: {
  form: UseFormReturn<UserFormValues>
}) => {
  const error = getFormFieldError(form.formState.errors, inputName)

  return (
    <div className="grid grid-cols-4 gap-2">
      <Label>Nombre</Label>
      <div className="col-span-3">
        <Controller
          name={inputName}
          control={form.control}
          render={({ field }) => <Input {...field} error={error?.message} />}
        />
      </div>
    </div>
  )
}
