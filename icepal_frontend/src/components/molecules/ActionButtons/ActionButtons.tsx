import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { IconButton, Tooltip } from '@material-tailwind/react'

type ActionButtonsProps = {
  onUpdate?: () => void
  onDelete?: () => void
  onView?: () => void
}

const ActionButtons = ({ onUpdate, onDelete, onView }: ActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      {onUpdate && (
        <IconButton onClick={onUpdate}>
          <Tooltip content="Editar">
            <PencilIcon className="h-6 w-6 text-blue-600" />
          </Tooltip>
        </IconButton>
      )}
      {onView && (
        <IconButton onClick={onView}>
          <Tooltip content="Visualizar">
            <EyeIcon className="h-6 w-6 text-green-600" />
          </Tooltip>
        </IconButton>
      )}
      {onDelete && (
        <IconButton onClick={onDelete}>
          <Tooltip content="Eliminar">
            <TrashIcon className="h-6 w-6 text-red-600" />
          </Tooltip>
        </IconButton>
      )}
    </div>
  )
}

export { ActionButtons }
