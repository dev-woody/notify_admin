'use client'

import React, { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HexColorPicker } from 'react-colorful'
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEvents } from '../context/events-context'
import { CalendarEvent } from '../utils/data'
import { DateTimePicker } from './date-picker'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Textarea } from './ui/textarea'
import { ToastAction } from './ui/toast'

const eventEditFormSchema = z.object({
  id: z.string(),
  title: z
    .string({ required_error: 'Please enter a title.' })
    .min(1, { message: 'Must provide a title for this event.' }),
  description: z
    .string({ required_error: 'Please enter a description.' })
    .min(1, { message: 'Must provide a description for this event.' }),
  start: z.date({
    required_error: 'Please select a start time',
    invalid_type_error: "That's not a date!",
  }),
  end: z.date({
    required_error: 'Please select an end time',
    invalid_type_error: "That's not a date!",
  }),
  color: z
    .string({ required_error: 'Please select an event color.' })
    .min(1, { message: 'Must provide a title for this event.' }),
})

type EventEditFormValues = z.infer<typeof eventEditFormSchema>

interface EventEditFormProps {
  oldEvent?: CalendarEvent
  event?: CalendarEvent
  isDrag: boolean
  displayButton: boolean
}

export function EventEditForm({
  oldEvent,
  event,
  isDrag,
  displayButton,
}: EventEditFormProps) {
  const { addEvent, deleteEvent } = useEvents()
  const { eventEditOpen, setEventEditOpen } = useEvents()

  const { toast } = useToast()

  const form = useForm<z.infer<typeof eventEditFormSchema>>({
    resolver: zodResolver(eventEditFormSchema),
  })

  const handleEditCancellation = () => {
    if (isDrag && oldEvent) {
      const resetEvent = {
        id: oldEvent.id,
        title: oldEvent.title,
        description: oldEvent.description,
        start: oldEvent.start,
        end: oldEvent.end,
        color: oldEvent.backgroundColor!,
      }

      deleteEvent(oldEvent.id)
      addEvent(resetEvent)
    }
    setEventEditOpen(false)
  }

  useEffect(() => {
    form.reset({
      id: event?.id,
      title: event?.title,
      description: event?.description,
      start: event?.start as Date,
      end: event?.end as Date,
      color: event?.backgroundColor,
    })
  }, [form, event])

  async function onSubmit(data: EventEditFormValues) {
    const newEvent = {
      id: data.id,
      title: data.title,
      description: data.description,
      start: data.start,
      end: data.end,
      color: data.color,
    }
    deleteEvent(data.id)
    addEvent(newEvent)
    setEventEditOpen(false)

    toast({
      title: '이벤트 수정완료.',
      action: (
        <ToastAction altText={'Click here to dismiss notification'}>
          취소
        </ToastAction>
      ),
    })
  }

  return (
    <AlertDialog open={eventEditOpen}>
      {displayButton && (
        <AlertDialogTrigger asChild>
          <Button
            className='w-full sm:w-24 text-xs md:text-sm mb-1'
            variant='default'
            onClick={() => setEventEditOpen(true)}
          >
            일정 수정
          </Button>
        </AlertDialogTrigger>
      )}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{event?.title} 수정</AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>일정 타이틀</FormLabel>
                  <FormControl>
                    <Input placeholder='타이틀을 입력하세요.' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>메모</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='메모를 입력하세요.'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='start'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel htmlFor='datetime'>시작일</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                      hourCycle={12}
                      granularity='minute'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='end'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel htmlFor='datetime'>마감일</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                      hourCycle={12}
                      granularity='minute'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>색상</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild className='cursor-pointer'>
                        <div className='flex flex-row w-full items-center space-x-2 pl-2'>
                          <div
                            className={`w-5 h-5 rounded-full cursor-pointer`}
                            style={{ backgroundColor: field.value }}
                          ></div>
                          <Input {...field} />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className='flex mx-auto items-center justify-center'>
                        <HexColorPicker
                          className='flex'
                          color={field.value}
                          onChange={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter className='pt-2'>
              <AlertDialogCancel onClick={() => handleEditCancellation()}>
                취소
              </AlertDialogCancel>
              <AlertDialogAction type='submit'>수정</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
