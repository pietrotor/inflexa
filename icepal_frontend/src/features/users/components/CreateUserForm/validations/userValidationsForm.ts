import { MESSAGE_VALIDATION_ERRORS, PATTERNS } from '@/utils'
import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(2, { message: MESSAGE_VALIDATION_ERRORS.required }),
  lastName: z.string().min(2, { message: MESSAGE_VALIDATION_ERRORS.required }),
  email: z.string().email({ message: MESSAGE_VALIDATION_ERRORS.invalidEmail }),
  password: z
    .string()
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

// Definir el tipo que se usará en el formulario
export type UserFormValues = z.infer<typeof userSchema>
