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
import { DateTimePicker } from './date-picker'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Textarea } from './ui/textarea'
import { ToastAction } from './ui/toast'

const eventAddFormSchema = z.object({
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

type EventAddFormValues = z.infer<typeof eventAddFormSchema>

interface AvailabilityCheckerEventAddFormProps {
  start: Date
  end: Date
}

export function AvailabilityCheckerEventAddForm({
  start,
  end,
}: AvailabilityCheckerEventAddFormProps) {
  const { events, addEvent } = useEvents()
  const {
    availabilityCheckerEventAddOpen,
    setAvailabilityCheckerEventAddOpen,
  } = useEvents()

  const { toast } = useToast()

  const form = useForm<z.infer<typeof eventAddFormSchema>>({
    resolver: zodResolver(eventAddFormSchema),
  })

  useEffect(() => {
    form.reset({
      title: '',
      description: '',
      start: start,
      end: end,
      color: '#76c7ef',
    })
  }, [form, start, end])

  async function onSubmit(data: EventAddFormValues) {
    const newEvent = {
      id: String(events.length + 1),
      title: data.title,
      description: data.description,
      start: data.start,
      end: data.end,
      color: data.color,
    }
    addEvent(newEvent)
    setAvailabilityCheckerEventAddOpen(false)
    toast({
      title: 'Event added!',
      action: (
        <ToastAction altText={'Click here to dismiss notification'}>
          Dismiss
        </ToastAction>
      ),
    })
  }

  return (
    <AlertDialog open={availabilityCheckerEventAddOpen}>
      {/* <AlertDialogTrigger className="flex" asChild>
        <Card
          onClick={() => setAvailabilityCheckerEventAddOpen(true)}
          className="flex py-2 px-4 my-2 w-full bg-secondary hover:bg-secondary/80 cursor-pointer"
        >
          {start.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
          })}
        </Card>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>일정 추가</AlertDialogTitle>
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
                      className='max-h-36'
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
              <AlertDialogCancel
                onClick={() => setAvailabilityCheckerEventAddOpen(false)}
              >
                취소
              </AlertDialogCancel>
              <AlertDialogAction type='submit'>일정 추가</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
