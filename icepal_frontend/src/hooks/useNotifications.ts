import { toast } from 'sonner'

const useNotifications = () => {
  const addSuccessNotification = (message: string | null) => {
    toast.success(message)
  }

  const addErrorNotification = (message: string | null) => {
    toast.error(message)
  }

  const addWarningNotification = (message: string | null) => {
    toast.warning(message)
  }

  const addActionNotification = ({
    action,
    message
  }: {
    message: string
    action: {
      label: string
      onClick?: () => void
    }
  }) => {
    toast(message, {
      action: {
        label: action.label,
        onClick: action.onClick ? () => action.onClick?.() : () => {}
      }
    })
  }

  return {
    addSuccessNotification,
    addErrorNotification,
    addWarningNotification,
    addActionNotification
  }
}

export { useNotifications }
