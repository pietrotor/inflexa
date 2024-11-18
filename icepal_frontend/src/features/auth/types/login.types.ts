import { User } from '@/features/users'

interface Theme {
  logo: string
  loginBackground: string
  color: string
}

interface Institute {
  _id: string
  deleted: boolean
  updatedBy: string | null
  deletedAt: string | null
  deletedBy: string | null
  name: string
  address: string | null
  contactNumber: string | null
  createdAt: string
  __v: number
  theme: Theme
  url: string
}

interface Career {
  _id: string
  createdBy: string
  deleted: boolean
  updatedBy: string | null
  deletedAt: string | null
  deletedBy: string | null
  name: string
  description: string
  status: string
  code: string
  academicDegree: string
  timeDuration: string
  shifts: string[]
  area: string
  studyPeriod: string
  instituteId: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface Login {
  email: string
  password: string
}

interface WebConfiguration {
  name: string
  pathLogo?: string | null
  color?: string | null
  loginBackground?: string | null
}

type CurrentSession = {
  user: User
  institute: Institute
  carrers: Career[]
}
export type { Login, WebConfiguration, CurrentSession, Career, Institute }
