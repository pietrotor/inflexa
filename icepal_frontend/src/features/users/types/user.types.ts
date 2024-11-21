type User = {
  _id: string
  deleted: boolean
  updatedBy: string | null
  deletedAt: string | null
  deletedBy: string | null
  email: string
  name: string
  lastName: string
  fullName: string
  isActive: boolean
  roles: string[]
  institute: {
    instituteId: string
    instituteName: string
  }
  createdAt: string
  __v: number
}

type CreateUserDto = {
  email: string
  password: string
  name: string
  lastName: string
  instituteId: string
}

type UpdateUserDto = Partial<CreateUserDto> & {
  _id: string
  isActive?: boolean
}

export type { CreateUserDto, User, UpdateUserDto }
