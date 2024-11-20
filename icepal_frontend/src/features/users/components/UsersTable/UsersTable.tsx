import { ColumnDef, DataTable, Switch } from 'design-system-eduno'
import { User, useUpdateUser } from '@/features/users'
import { TDataTablePaginatedProps } from '@/types'

export const UsersTable = ({
  data,
  isFetching,
  isLoading,
  pagination,
  search,
  toolbar,
  toolbarPosition
}: TDataTablePaginatedProps<User>) => {
  const updateMutation = useUpdateUser()

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'fullName',
      header: 'Nombre',
      cell: ({ row }) => row.getValue('fullName')
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <div>{row.getValue('email')}</div>
    },
    {
      accessorKey: 'isActive',
      header: 'Estado',
      cell: ({ row }) => (
        <div>
          <Switch
            checked={row.getValue('isActive')}
            onCheckedChange={() => {
              updateMutation.mutate({
                _id: row.original?._id,
                isActive: !row.getValue('isActive')
              })
            }}
          />
        </div>
      )
    }
  ]
  return (
    <DataTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      isFetching={isFetching && !updateMutation.isSuccess}
      toolbar={toolbar}
      toolbarPosition={toolbarPosition}
      configuration={{
        pagination,
        searchLabel: 'Buscar por: Nombre, email',
        search
      }}
    />
  )
}
