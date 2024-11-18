import { useUsers } from '@/features/users'

const UsersPage = () => {
  const { data, isLoading } = useUsers({})

  console.log(data)

  return <>asdfasdf</>
}

export { UsersPage }
