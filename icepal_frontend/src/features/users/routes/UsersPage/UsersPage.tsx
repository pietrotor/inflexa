import { UsersTable } from '@/features/users/components'
import { User, useUsersState } from '@/features/users'
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
    disclosure,
    onSubmit,
    isMutating,
    handleUpdateUser
  } = useUsersState()

  return (
    <>
      <CreateUserForm
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
        onSubmit={onSubmit}
        isLoading={isMutating}
        initialValues={disclosure.data as User}
      />
      <UsersTable
        data={data?.data || []}
        isFetching={isFetching}
        isLoading={isLoading}
        pagination={pagination}
        search={search}
        onUpdate={user => handleUpdateUser(user)}
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
