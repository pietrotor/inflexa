type User = {
  _id: string
  deleted: boolean
  updatedBy: string | null
  deletedAt: string | null
  deletedBy: string | null
  email: string
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

export type { User }
