import { useForm } from 'react-hook-form'
import { UserFormValues, userSchema } from '../validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUserDto } from '@/features/users/types'
import { useEffect } from 'react'

type UserFormParams = {
  initialValues?: UpdateUserDto
}

const useUserForm = ({ initialValues }: UserFormParams = {}) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema)
    // defaultValues: {
    //   name: '',
    //   lastName: '',
    //   email: '',
    //   password: ''
    // }
  })

  const { reset } = form

  useEffect(() => {
    if (!initialValues) return
    reset({
      email: initialValues.email,
      name: initialValues.name,
      lastName: initialValues.lastName
    })
  }, [initialValues, reset])

  return {
    form
  }
}

export { useUserForm }
