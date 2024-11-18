import { useForm } from "react-hook-form"
import { Login } from "../types"

const useLoginForm = () => {
  const form = useForm<Login>()

  return form
}

export { useLoginForm }