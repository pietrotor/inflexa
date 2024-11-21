import { useForm } from 'react-hook-form'
import { UserFormValues, getUserSchema } from '../validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUserDto } from '@/features/users/types'
import { useEffect, useMemo } from 'react'

type UserFormParams = {
  initialValues?: UpdateUserDto
}

const useUserForm = ({ initialValues }: UserFormParams = {}) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(getUserSchema({ isEditing: Boolean(initialValues) }))
  })

  const { reset } = form

  const isEditing = useMemo(() => Boolean(initialValues), [initialValues])

  useEffect(() => {
    if (!initialValues) return
    reset({
      email: initialValues.email,
      name: initialValues.name,
      lastName: initialValues.lastName
    })
  }, [initialValues, reset])

  return {
    form,
    isEditing
  }
}

export { useUserForm }
