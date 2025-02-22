import React, { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'

export interface DeleteDialogProps<T> {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: T
  title?: string
  /**
   * 삭제 확인 후 호출되는 콜백 (옵션)
   */
  onDelete?: (data: T) => void
  /**
   * 삭제 다이얼로그에 표시할 커스텀 메시지 (옵션)
   */
  renderMessage?: (data: T) => React.ReactNode
  deleteKey: keyof T
}

export function DeleteDialog<T>({
  open,
  onOpenChange,
  currentRow,
  onDelete,
  renderMessage,
  deleteKey,
}: DeleteDialogProps<T>) {
  // currentRow가 없으면 아무것도 렌더링하지 않음
  if (!currentRow) return null
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (value.trim() !== currentRow[deleteKey]) return

    onOpenChange(false)
    toast({
      title: 'The following user has been deleted:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>
            {JSON.stringify(currentRow, null, 2)}
          </code>
        </pre>
      ),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow[deleteKey]}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='mr-1 inline-block stroke-destructive'
            size={18}
          />
          항목 삭제
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            정말로
            <span className='font-bold'>{` ${currentRow[deleteKey]} `}</span>
            을(를) 삭제하시겠습니까?
            <br />
            삭제를 한 후에는 복구하거나 변경할 수 없습니다.
            {/* <span className='font-bold'>
              {currentRow.role.toUpperCase()}
            </span>{' '} */}
          </p>

          <Label className='my-2'>
            {/* {`${currentRow[deleteKey]}:`} */}
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='삭제하려는 항목명을 입력해주세요.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>경고!</AlertTitle>
            <AlertDescription>
              이 작업은 되돌릴 수 없으므로 주의하시기 바랍니다.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='삭제'
      destructive
    />
  )
}
