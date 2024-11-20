import { UsersTable } from '@/features/users/components'
import { useUsersState } from '@/features/users'
import { Button, Plus } from 'design-system-eduno'
import { CreateUserForm } from '../../components/CreateUserForm'

const UsersPage = () => {
  const {
    data,
    isFetching,
    isLoading,
    pagination,
    search,
    handleCreateUser,
    disclosure
  } = useUsersState()

  return (
    <>
      <CreateUserForm isOpen={disclosure.isOpen} onClose={disclosure.onClose} />
      <UsersTable
        data={data?.data || []}
        isFetching={isFetching}
        isLoading={isLoading}
        pagination={pagination}
        search={search}
        toolbar={
          <Button onClick={handleCreateUser}>
            <Plus />
            Crear usuario
          </Button>
        }
      />
    </>
  )
}

export { UsersPage }
