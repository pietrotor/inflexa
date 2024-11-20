import { get } from 'react-hook-form'

function getFormFieldError(
  object: unknown,
  path?: string | null
  //   defaultValue?: unknown
): any {
  return get(object, path)
}

export { getFormFieldError }
