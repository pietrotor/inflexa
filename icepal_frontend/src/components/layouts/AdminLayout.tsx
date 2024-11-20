import { motion } from 'framer-motion'
import { ReactNode, useEffect } from 'react'
import { PageLoader, Sidebar, Typography } from 'design-system-eduno'
import { ADMIN_SIDEBAR_CONFIG } from '@/utils/constants/sidebar-config'
import { useCurrent } from '@/features/auth/api/get-current'

import { useCurrentSessionStore } from '@/features/auth'
import { useBreadcrumbs } from '@/hooks'
import { Navigate } from 'react-router'

type AdminLayoutProps = {
  children: ReactNode
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { data, isLoading, isError } = useCurrent({})

  const { setCurrentSessionState } = useCurrentSessionStore()

  const { lastItem } = useBreadcrumbs()

  useEffect(() => {
    document.title = lastItem?.title || 'Eduno'
  }, [lastItem])

  useEffect(() => {
    if (data && !isLoading && !isError) {
      setCurrentSessionState(data)
    }
  }, [data, isLoading, isError, setCurrentSessionState])

  if (isLoading) {
    return <PageLoader />
  }

  if (!data || isError) {
    return <Navigate to={'/login'} />
  }
  return (
    <main className="h-screen">
      <div className="flex h-full max-h-screen bg-white">
        <Sidebar
          {...ADMIN_SIDEBAR_CONFIG}
          avatar={{
            fallback: data.user.fullName.slice(0, 2)
          }}
          logo={data.institute.theme.logo}
        />
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="max-h-full w-full flex-1 overflow-y-auto md:p-6"
        >
          {lastItem?.title && (
            <div className="mb-4">
              <Typography variant="h4" className="text-primary">
                {lastItem.title}
              </Typography>
              <Typography variant="span" className="font-medium">
                {data.institute.name}
              </Typography>
            </div>
          )}
          {children}
        </motion.section>
      </div>
    </main>
  )
}
