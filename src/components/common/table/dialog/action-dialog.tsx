import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ActionDialogProps<T> {
  submitKey: string
  open: boolean
  onOpenChange: (open: boolean) => void
  type?: 'add' | 'edit'
  description?: string
  form: ReactNode
  currentRow?: T
}

export function ActionDialog<T>({
  submitKey,
  open,
  onOpenChange,
  type = 'add',
  form,
  // onSubmit,
}: ActionDialogProps<T>) {
  const isEdit = type === 'edit'
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      {open && <div className='fixed inset-0 bg-black bg-opacity-50 z-50' />}
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? '항목 수정' : '항목 추가'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? '항목의 내용을 수정합니다. '
              : '새로운 항목을 생성합니다. '}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          {form}
        </ScrollArea>
        <DialogFooter>
          <Button form={submitKey} type='submit'>
            {isEdit ? '수정하기' : '추가하기 '}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
