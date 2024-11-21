import { Controller, UseFormReturn } from 'react-hook-form'
import { UserFormValues } from '../validations'
import { Input, Label } from 'design-system-eduno'
import { getFormFieldError } from '@/utils'

const inputName = 'email'

export const EmailField = ({
  form,
  isEditing
}: {
  form: UseFormReturn<UserFormValues>
  isEditing?: boolean
}) => {
  const error = getFormFieldError(form.formState.errors, inputName)

  const { trigger } = form

  return (
    <div className="grid grid-cols-4 items-center gap-2">
      <Label className="flex items-center">Email</Label>
      <div className="col-span-3">
        <Controller
          name={inputName}
          control={form.control}
          render={({ field }) => (
            <Input
              placeholder="micorreo@gmail.com"
              {...field}
              disabled={isEditing}
              error={error?.message}
              autoComplete="off"
              onBlur={() => trigger('email')}
            />
          )}
        />
      </div>
    </div>
  )
}
