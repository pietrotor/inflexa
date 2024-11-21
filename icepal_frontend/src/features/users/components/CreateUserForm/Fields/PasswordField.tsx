import { Controller, UseFormReturn } from 'react-hook-form'
import { UserFormValues } from '../validations'
import { CircleX, Input, Label } from 'design-system-eduno'
import { getFormFieldError, PATTERNS } from '@/utils'
import clsx from 'clsx'

const inputName = 'password'

const VALIDATIONS = [
  {
    test: (val: any) => val.length >= 8,
    message: 'Al menos 8 caracteres'
  },
  {
    test: (val: any) => PATTERNS.hasLowerCase.test(val),
    message: 'Una letra minúscula'
  },
  {
    test: (val: any) => PATTERNS.hasUpperCase.test(val),
    message: 'Una letra mayúscula'
  },
  {
    test: (val: any) => PATTERNS.hasNumber.test(val),
    message: 'Un número'
  },
  {
    test: (val: any) => PATTERNS.hasSpecialCharacter.test(val),
    message: 'Un caracter especial (@, #, $)'
  },
  {
    test: (val: any) => !PATTERNS.breakLinesAndPoints.test(val),
    message: 'No debe contener puntos (.) ni saltos de línea'
  }
]

export const PasswordField = ({
  form,
  isEditing
}: {
  form: UseFormReturn<UserFormValues>
  isEditing: boolean
}) => {
  const {
    formState: { touchedFields, isSubmitted },
    unregister
  } = form

  const error = getFormFieldError(form.formState.errors, inputName)

  return (
    <div className="grid grid-cols-4 gap-2">
      <Label className="pt-4">Contraseña</Label>
      <div className="col-span-3">
        <Controller
          name={inputName}
          control={form.control}
          render={({ field }) => (
            <>
              <Input
                placeholder="MiContraseñ@3"
                type="password"
                hasError={!!error?.message}
                description={
                  <div className="flex flex-col px-2 py-1 text-xs text-gray-500">
                    {VALIDATIONS.map(({ message, test }) => {
                      const showGrayLabel = isEditing
                        ? !field.value
                        : !(touchedFields?.[inputName] || isSubmitted)
                      return (
                        <p
                          className={clsx(
                            'flex items-center gap-1 text-xs font-semibold',
                            !showGrayLabel
                              ? !test(field.value ?? '')
                                ? 'text-red-500'
                                : 'text-green-600'
                              : 'text-gray-500'
                          )}
                        >
                          <CircleX
                            size={13}
                            className={clsx(
                              !showGrayLabel
                                ? !test(field.value ?? '')
                                  ? 'text-red-500'
                                  : 'text-green-600'
                                : 'text-gray-500'
                            )}
                          />

                          {message}
                        </p>
                      )
                    })}
                  </div>
                }
                {...field}
                onChange={e => {
                  if (!e.target.value) {
                    field.onChange(undefined)
                    unregister('password')
                  }
                  field.onChange(e)
                }}
                autoComplete="new-password"
              />
            </>
          )}
        />
      </div>
    </div>
  )
}
