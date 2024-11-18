import {
  Home,
  FileText,
  Folder,
  Music,
  User,
  Settings
} from 'design-system-eduno'

export const ADMIN_SIDEBAR_CONFIG = {
  groups: [
    {
      title: 'Main',
      icon: <Home />,
      routes: [
        {
          title: 'Dashboard',
          icon: <FileText />,
          isActive: true,
          onClick: () => console.log('Navigating to Dashboard')
        },
        {
          title: 'Files',
          icon: <Folder />,
          items: [
            {
              title: 'Documents',
              icon: <FileText />,
              isActive: false,
              onClick: () => console.log('Navigating to Documents')
            },
            {
              title: 'Music',
              icon: <Music />,
              isActive: false,
              onClick: () => console.log('Navigating to Music')
            }
          ]
        }
      ]
    },
    {
      title: 'Account',
      icon: <User />,
      routes: [
        {
          title: 'Profile',
          icon: <User />,
          isActive: false,
          onClick: () => console.log('Navigating to Profile')
        },
        {
          title: 'Settings',
          icon: <Settings />,
          isActive: false,
          onClick: () => console.log('Navigating to Settings')
        }
      ]
    }
  ]
}
