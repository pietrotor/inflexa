import { Button } from 'design-system-eduno'

type FormActionButtonsProps = {
  isLoading?: boolean
  submitType?: 'button' | 'submit'
  submitText?: string
  cancelText?: string
  disabledSubmit?: boolean
  onSubmit: () => void
  onCancel?: () => void
}
export const FormActionButtons = ({
  onCancel,
  onSubmit,
  disabledSubmit = false,
  submitType = 'button',
  isLoading,
  cancelText = 'Cancelar',
  submitText = 'Guardar'
}: FormActionButtonsProps) => {
  return (
    <div className="flex w-full justify-center gap-3 border-t pt-4">
      {onCancel && (
        <Button
          type={'button'}
          disabled={isLoading}
          onClick={onCancel}
          className="min-w-[120px]"
          variant={'ghost'}
        >
          {cancelText}
        </Button>
      )}
      <Button
        type={submitType}
        isLoading={isLoading}
        disabled={disabledSubmit}
        className="min-w-[120px]"
        onClick={onSubmit}
      >
        {submitText}
      </Button>
    </div>
  )
}
