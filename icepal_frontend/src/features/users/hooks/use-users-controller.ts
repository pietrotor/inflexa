import { useCreateUser, useUpdateUser } from '../api'
import { CreateUserDto, UpdateUserDto, User } from '../types'

export const useUserController = () => {
  const createUserMutation = useCreateUser()
  const updateUserMutation = useUpdateUser()

  const onCreateUser = (
    data: CreateUserDto,
    callback?: (data?: User) => void
  ) => {
    createUserMutation
      .mutateAsync(data)
      .then(data => {
        callback?.(data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const onUpdateUser = (
    data: UpdateUserDto,
    callback?: (data?: User) => void
  ) => {
    updateUserMutation
      .mutateAsync(data)
      .then(data => {
        callback?.(data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return {
    onCreateUser,
    onUpdateUser,
    loading: createUserMutation.isPending || updateUserMutation.isPending
  }
}
