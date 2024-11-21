import { Controller, UseFormReturn } from 'react-hook-form'
import { UserFormValues } from '../validations'
import { Input, Label } from 'design-system-eduno'
import { getFormFieldError } from '@/utils'

const inputName = 'lastName'

export const LastNameField = ({
  form
}: {
  form: UseFormReturn<UserFormValues>
}) => {
  const error = getFormFieldError(form.formState.errors, inputName)

  return (
    <div className="grid grid-cols-4 gap-2">
      <Label>Apellido</Label>
      <div className="col-span-3">
        <Controller
          name={inputName}
          control={form.control}
          render={({ field }) => (
            <Input
              placeholder="Rojas Perez"
              error={error?.message}
              {...field}
            />
          )}
        />
      </div>
    </div>
  )
}
