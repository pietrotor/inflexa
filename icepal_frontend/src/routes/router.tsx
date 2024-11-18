import { createBrowserRouter } from 'react-router-dom'
import { AdminRoutesEnum } from '@/utils'
import { AdminProvider } from '@/providers'

export const router = createBrowserRouter([
  {
    path: '/',

    element: <></>
  },
  {
    id: AdminRoutesEnum.LOGIN,
    path: 'login',
    lazy: async () => {
      const { LoginPage } = await import('@/features/auth')
      return {
        element: <LoginPage />
      }
    }
  },
  {
    id: AdminRoutesEnum.ADMIN,
    path: 'admin',
    element: <AdminProvider />,
    children: [
      // {
      //   id: AdminRoutesEnum.STUDENTS,
      //   path: "students",
      //   children: [
      //     {
      //       path: "",
      //       lazy: async () => {
      //         const { StudentsPage } = await import("@/features/students");
      //         return {
      //           element: <StudentsPage />,
      //         };
      //       },
      //     },
      //     {
      //       id: AdminRoutesEnum.CREATE_STUDENT,
      //       path: "create",
      //       lazy: async () => {
      //         const { CreateStudentPage } = await import("@/features/students");
      //         return {
      //           element: <CreateStudentPage />,
      //         };
      //       },
      //     },
      //   ],
      // },
      {
        id: AdminRoutesEnum.USERS,
        path: 'users',
        handle: {
          breadcrumb: 'Usuarios'
        },
        children: [
          {
            path: '',
            lazy: async () => {
              const { UsersPage } = await import('@/features/users')
              return {
                element: <UsersPage />
              }
            }
          },
          {
            id: AdminRoutesEnum.CREATE_USERS,
            path: 'create',
            lazy: async () => {
              return {
                element: <></>
              }
            }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <>Ruta inexistente</>
  }
])
