import { getUserByEmail } from '@/features/users/api'
import { MESSAGE_VALIDATION_ERRORS, PATTERNS } from '@/utils'
import { z } from 'zod'

type Params = {
  isEditing: boolean
}

export const getUserSchema = ({ isEditing }: Params) => {
  return z.object({
    name: z.string({
      message: MESSAGE_VALIDATION_ERRORS.required
    }),
    lastName: z.string({
      message: MESSAGE_VALIDATION_ERRORS.required
    }),
    email: z
      .string({
        message: MESSAGE_VALIDATION_ERRORS.required
      })
      .email({ message: MESSAGE_VALIDATION_ERRORS.invalidEmail })
      .refine(async value => {
        if (isEditing) return true
        if (value) {
          try {
            await getUserByEmail({ email: value })
            return false
          } catch (error) {
            console.log(error)
            return true
          }
        }
        return true
      }, 'Este correo ya está registrado'),
    password: isEditing
      ? z
          // .string()
          .string({
            message: MESSAGE_VALIDATION_ERRORS.required
          })
          .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }) // Longitud mínima
          .refine(val => PATTERNS.hasUpperCase.test(val), {
            message: 'Debe contener al menos una letra mayúscula'
          }) // Al menos una letra mayúscula
          .refine(val => PATTERNS.hasLowerCase.test(val), {
            message: 'Debe contener al menos una letra minúscula'
          }) // Al menos una letra minúscula
          .refine(val => PATTERNS.hasNumber.test(val), {
            message: 'Debe contener al menos un número'
          }) // Al menos un número
          .refine(val => PATTERNS.hasSpecialCharacter.test(val), {
            message: 'Debe contener al menos un carácter especial'
          }) // Al menos un carácter especial
          .refine(val => !PATTERNS.breakLinesAndPoints.test(val), {
            message: 'No debe contener puntos (.) ni saltos de línea'
          }) // Prohibir puntos y saltos de línea
          .optional()
      : z
          .string({
            message: MESSAGE_VALIDATION_ERRORS.required
          })
          .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }) // Longitud mínima
          .refine(val => PATTERNS.hasUpperCase.test(val), {
            message: 'Debe contener al menos una letra mayúscula'
          }) // Al menos una letra mayúscula
          .refine(val => PATTERNS.hasLowerCase.test(val), {
            message: 'Debe contener al menos una letra minúscula'
          }) // Al menos una letra minúscula
          .refine(val => PATTERNS.hasNumber.test(val), {
            message: 'Debe contener al menos un número'
          }) // Al menos un número
          .refine(val => PATTERNS.hasSpecialCharacter.test(val), {
            message: 'Debe contener al menos un carácter especial'
          }) // Al menos un carácter especial
          .refine(val => !PATTERNS.breakLinesAndPoints.test(val), {
            message: 'No debe contener puntos (.) ni saltos de línea'
          }) // Prohibir puntos y saltos de línea
  })
}

// // Definir el tipo que se usará en el formulario
// export type UserFormValues = z.infer<typeof userSchema>

export type UserFormValues = z.infer<ReturnType<typeof getUserSchema>>
