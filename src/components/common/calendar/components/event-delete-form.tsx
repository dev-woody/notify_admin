'use client'

import React from 'react'
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useEvents } from '../context/events-context'
import { ToastAction } from './ui/toast'

interface EventDeleteFormProps {
  id?: string
  title?: string
}

export function EventDeleteForm({ id, title }: EventDeleteFormProps) {
  const { deleteEvent } = useEvents()
  const { eventDeleteOpen, setEventDeleteOpen, setEventViewOpen } = useEvents()

  const { toast } = useToast()

  async function onSubmit() {
    deleteEvent(id!)
    setEventDeleteOpen(false)
    setEventViewOpen(false)
    toast({
      title: '일정을 삭제하였습니다.',
      action: <ToastAction altText={'Dismiss notification.'}>닫기</ToastAction>,
    })
  }

  return (
    <AlertDialog open={eventDeleteOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' onClick={() => setEventDeleteOpen(true)}>
          일정 삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex flex-row justify-between items-center'>
            <h1>{title} 일정 삭제</h1>
          </AlertDialogTitle>
          정말 이 일정을 삭제하실건가요?
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setEventDeleteOpen(false)}>
            취소
          </AlertDialogCancel>
          <Button variant='destructive' onClick={() => onSubmit()}>
            삭제
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
