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

type UpdateUserDto = Partial<User> & {
  _id: string
}

export type { User, UpdateUserDto }
