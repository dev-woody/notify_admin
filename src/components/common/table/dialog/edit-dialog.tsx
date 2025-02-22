import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

export interface EditDialogProps<T> {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: T
  title?: string
  /**
   * 엔티티를 수정한 후 호출되는 콜백 (옵션)
   */
  onSubmit?: (data: T) => void
  /**
   * 커스터마이징 가능한 폼 렌더러 (옵션)
   * @param data 현재 엔티티 데이터
   * @param onChange 업데이트된 값(부분 변경)을 적용하는 함수
   */
  renderForm?: (
    data: T,
    onChange: (updated: Partial<T>) => void
  ) => React.ReactNode
}

export function EditDialog<T>({
  open,
  onOpenChange,
  currentRow,
  title,
  onSubmit,
  renderForm,
}: EditDialogProps<T>) {
  // currentRow가 없으면 아무것도 렌더링하지 않음
  if (!currentRow) return null

  const [formData, setFormData] = React.useState<T>(currentRow)

  React.useEffect(() => {
    setFormData(currentRow)
  }, [currentRow])

  const handleChange = (updated: Partial<T>) => {
    setFormData((prev) => ({ ...prev, ...updated }))
  }

  const handleSave = () => {
    // onSubmit이 전달된 경우에만 호출
    if (onSubmit) {
      onSubmit(formData)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{title || 'Edit'}</DialogTitle>
        </DialogHeader>
        {renderForm ? renderForm(formData, handleChange) : null}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
