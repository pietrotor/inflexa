import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from 'design-system-eduno'
import { UserForm } from './UserForm'
import { UserFormValues } from './validations'
import { User } from '../../types'
import { useMemo } from 'react'

type CreateUserFormProps = {
  onSubmit: (data: UserFormValues) => void
  isOpen: boolean
  isLoading?: boolean
  onClose: () => void
  initialValues?: User
}

export const CreateUserForm = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  initialValues
}: CreateUserFormProps) => {
  const isEditing = useMemo(() => Boolean(initialValues), [initialValues])
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogHeader className="mb-4">
        <DialogTitle>
          {isEditing ? 'Editar usurio' : 'Crear usuario'}
        </DialogTitle>
        <DialogDescription>
          {isEditing
            ? 'Ingrese los nuevos datos del usuario'
            : 'Ingresa los datos del nuevo usuario para registrarlo'}
        </DialogDescription>
      </DialogHeader>
      <UserForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        onCancel={onClose}
        isLoading={isLoading}
      />
    </Dialog>
  )
}
