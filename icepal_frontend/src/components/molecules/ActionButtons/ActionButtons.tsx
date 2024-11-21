import {
  Button,
  DeleteIcon,
  Edit,
  EllipsisVertical,
  EyeIcon,
  Popover,
  PopoverContent,
  PopoverTrigger
} from 'design-system-eduno'
import React from 'react'

type ActionButtonsProps = {
  onUpdate?: () => void
  onDelete?: () => void
  onView?: () => void
  disabled?: {
    update?: boolean
    delete?: boolean
    view?: boolean
  }
}

const ActionButton = ({
  onClick,
  icon,
  textLabel
}: {
  onClick?: () => void
  textLabel: string
  icon: React.ReactNode
}) => {
  if (!onClick) return

  return (
    <Button
      onClick={onClick}
      className="flex justify-start rounded-none p-0 px-4"
      variant={'ghost'}
    >
      {icon} {textLabel}
    </Button>
  )
}

const ActionButtons = ({ onUpdate, onDelete, onView }: ActionButtonsProps) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button variant={'ghost'} className="!h-7 !w-7 rounded-full !p-0">
            <EllipsisVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          className="flex w-fit min-w-40 flex-col !px-0 !py-0 align-top"
        >
          <ActionButton onClick={onUpdate} textLabel="Editar" icon={<Edit />} />
          <ActionButton
            onClick={onDelete}
            textLabel="Eliminar"
            icon={<DeleteIcon />}
          />
          <ActionButton
            onClick={onView}
            textLabel="Ver detalle"
            icon={<EyeIcon />}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}

export { ActionButtons }
