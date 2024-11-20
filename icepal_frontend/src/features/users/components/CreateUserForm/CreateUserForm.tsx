import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from 'design-system-eduno'
import { UserForm } from './UserForm'

type CreateUserFormProps = {
  isOpen: boolean
  onClose: () => void
}

export const CreateUserForm = ({ isOpen, onClose }: CreateUserFormProps) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogHeader>
        <DialogTitle>Crear usuario</DialogTitle>
        <DialogDescription>
          Ingresa los datos del nuevo usuario para registrarlo
        </DialogDescription>
      </DialogHeader>
      <UserForm />
    </Dialog>
  )
}
