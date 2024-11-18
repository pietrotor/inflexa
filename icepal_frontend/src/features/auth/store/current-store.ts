import { User } from '@/features/users'
import { create } from 'zustand'
import { Career, Institute } from '../types'

interface CurrentSessionState {
  user: User | null
  institute: Institute | null
  careers: Career[]
  setCurrentSessionState: (state: Partial<CurrentSessionState>) => void
}

const useCurrentSessionStore = create<CurrentSessionState>(set => ({
  user: null,
  institute: null,
  careers: [],
  setCurrentSessionState: state => set(prev => ({ ...prev, ...state }))
}))

export { useCurrentSessionStore }
