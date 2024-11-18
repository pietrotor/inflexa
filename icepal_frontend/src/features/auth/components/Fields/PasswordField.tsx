'use client'

import { Controller, get, UseFormReturn } from 'react-hook-form'
import { Login } from '../../types'
import { ErroField } from '@/components'
import { Input } from 'design-system-eduno'

type PasswordFieldProps = {
  form: UseFormReturn<Login>
}

const inputName = 'password'

const PasswordField = ({ form }: PasswordFieldProps) => {
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
        required: 'Campo requerido'
      }}
      render={({ field: { name, value, onChange } }) => (
        <div>
          <Input
            error={error?.message}
            name={name}
            type="password"
            label="Contraseña"
            placeholder="*********"
            value={value}
            onChange={onChange}
          />
          <ErroField messsage={error?.message} />
        </div>
      )}
    />
  )
}

export { PasswordField }
