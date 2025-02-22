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

interface InviteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  description?: string
  form: ReactNode // 🔹 폼을 외부에서 받아오기
}

export function InviteDialog({ open, onOpenChange, form }: InviteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>항목 초대</DialogTitle>
          <DialogDescription>위 유저를 초대합니다.</DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          {form}
        </ScrollArea>
        <DialogFooter>
          <Button form='invite' type='submit'>
            초대하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
