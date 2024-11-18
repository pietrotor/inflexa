import { Controller, get, UseFormReturn } from 'react-hook-form'
import { Login } from '../../types'
import { Input } from 'design-system-eduno'

import { MESSAGE_VALIDATION_ERRORS, PATTERNS } from '@/utils'

type EmailFieldProps = {
  form: UseFormReturn<Login>
}

const inputName = 'email'

const EmailField = ({ form }: EmailFieldProps) => {
  const {
    control,
    formState: { errors }
  } = form

  const error = get(errors, inputName)

  return (
    <Controller
      name={inputName}
      control={control}
      rules={{
        required: MESSAGE_VALIDATION_ERRORS.required,
        pattern: {
          value: PATTERNS.isEmail,
          message: MESSAGE_VALIDATION_ERRORS.invalidEmail
        }
      }}
      render={({ field: { name, value, onChange } }) => (
        <div>
          <Input
            name={name}
            label="Correo electrónico"
            placeholder="micorreo@gmail.com"
            error={error?.message}
            value={value}
            onChange={onChange}
          />
        </div>
      )}
    />
  )
}

export { EmailField }
