'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { DateTime, Duration, Interval } from 'luxon'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEvents } from '../context/events-context'
import { getDateFromMinutes } from '../lib/utils'
import { CalendarEvent, earliestTime, latestTime } from '../utils/data'
import { AvailabilityCheckerEventAddForm } from './availability-checker-event-add-form'
import { Card } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { TimePicker } from './ui/time-picker/time-picker'

export default function AvailabilityChecker() {
  const { events, setAvailabilityCheckerEventAddOpen } = useEvents()

  const earliestHour = getDateFromMinutes(earliestTime).getHours()
  const earliestMin = getDateFromMinutes(earliestTime).getMinutes()
  const latestHour = getDateFromMinutes(latestTime).getHours()
  const latestMin = getDateFromMinutes(latestTime).getMinutes()

  const dateObj = new Date()
  dateObj.setDate(dateObj.getDate() - 1)

  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [availableSlots, setAvailableSlots] = useState<Date[]>([])
  const [loading, setLoading] = useState(true)
  const [sessionLength, setSessionLength] = useState(60)

  const [selectedStartTime, setSelectedStartTime] = React.useState<
    Date | undefined
  >(getDateFromMinutes(earliestTime))

  const [selectedLastTime, setSelectedLastTime] = React.useState<
    Date | undefined
  >(getDateFromMinutes(latestTime))

  const [selectedSlotStart, setSelectedSlotStart] = useState(
    JSON.parse(
      JSON.stringify({
        hour: earliestHour,
        minute: earliestMin,
        second: 0,
        millisecond: 0,
      })
    )
  )

  const [selectedSlotEnd, setSelectedSlotEnd] = useState(
    new Date(
      new Date(selectedSlotStart.toString()).getTime() + sessionLength * 60000
    )
  )

  const handleSlotClick = (slot: Date) => {
    setSelectedSlotStart(slot)
    setSelectedSlotEnd(
      new Date(new Date(slot.toString()).getTime() + sessionLength * 60000)
    )

    setAvailabilityCheckerEventAddOpen(true)
  }

  const dateToLuxonDateTime = (date: Date): DateTime => {
    return DateTime.fromJSDate(date)
  }

  const minSlotDuration = useMemo(
    () =>
      Duration.fromObject({
        hours: 0,
        minutes: sessionLength,
      }),
    [sessionLength]
  )

  const slotAvailable = (
    from: DateTime,
    to: DateTime,
    events: CalendarEvent[]
  ) => {
    const fromU = from.set({ millisecond: 0 })
    const toU = to.set({ millisecond: 0 })
    for (const event of events) {
      const eventStart = DateTime.fromJSDate(new Date(event.start)).set({
        millisecond: 0,
      })
      const eventEnd = DateTime.fromJSDate(new Date(event.end)).set({
        millisecond: 0,
      })

      if (fromU < eventEnd && toU > eventStart) {
        return false // Overlapping event found
      }
    }
    return true
  }

  useEffect(() => {
    const available: DateTime[] = []
    const unavailable: DateTime[] = []

    let newStart = dateToLuxonDateTime(date!).set({
      hour:
        (selectedStartTime?.getHours() || earliestHour) < earliestHour
          ? earliestHour
          : selectedStartTime?.getHours() || earliestHour,
      minute: selectedStartTime?.getMinutes() || 0,
      second: 0,
      millisecond: 59,
    })

    const newEnd = dateToLuxonDateTime(date!).set({
      hour:
        (selectedLastTime?.getHours() || latestHour) > latestHour
          ? latestHour
          : selectedLastTime?.getHours() || latestHour,
      minute: (selectedLastTime?.getMinutes() || 0) - sessionLength,
      second: 59,
      millisecond: 59,
    })

    while (newStart < newEnd) {
      const currentSlotEnd = newStart.plus(minSlotDuration)
      const slot = Interval.fromDateTimes(newStart, currentSlotEnd)

      if (slotAvailable(slot.start!, slot.end!, events)) {
        available.push(slot.start!)
      } else {
        unavailable.push(slot.start!)
      }

      newStart = newStart.plus({ minutes: 15 }) // Move to the next 15-minute interval
    }

    setAvailableSlots(available.map((dt) => dt.toJSDate()))

    setLoading(false)
  }, [
    events,
    date,
    minSlotDuration,
    selectedStartTime,
    selectedLastTime,
    earliestHour,
    latestHour,
    earliestMin,
    latestMin,
    sessionLength,
  ])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-48'>
        <script
          type='module'
          src='https://cdn.jsdelivr.net/npm/ldrs/dist/auto/tailspin.js'
        />
      </div>
    )
  }

  return (
    <div>
      <div className='flex flex-wrap justify-start space-x-2 text-xs md:text-md lg:text-base'>
        <div className='flex flex-col items-center p-1'>
          시간 단위
          <Select
            onValueChange={(value) => setSessionLength(parseInt(value, 10))}
            defaultValue={String(sessionLength)}
          >
            <SelectTrigger id='sessionLength'>
              <SelectValue placeholder='Select' />
            </SelectTrigger>
            <SelectContent position='popper'>
              <SelectItem value='45'>45</SelectItem>
              <SelectItem value='60'>1:00</SelectItem>
              <SelectItem value='75'>1:15</SelectItem>
              <SelectItem value='90'>1:30</SelectItem>
              <SelectItem value='105'>1:45</SelectItem>
              <SelectItem value='120'>2:00</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col items-center p-1'>
          시작 시간
          <TimePicker
            date={selectedStartTime}
            setDate={setSelectedStartTime}
            defaultPeriod='AM'
          />
        </div>
        <div className='flex flex-col items-center p-1'>
          마감 시간
          <TimePicker
            date={selectedLastTime}
            setDate={setSelectedLastTime}
            defaultPeriod='PM'
          />
        </div>
      </div>

      <Card className='mt-4'>
        <div className='flex flex-wrap justify-center mx-3 sm:flex-row'>
          <div className='flex flex-col w-full py-3 sm:w-1/2 justify-center items-center'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              disabled={(date) => date <= dateObj}
              className='rounded-md border shadow-md'
            />
          </div>

          <div className='flex flex-col w-full py-3 sm:w-1/2 mt-4 mb-2 sm:mt-0'>
            <ScrollArea className='flex h-96 px-4'>
              {availableSlots.map((slot, index) => (
                <Card
                  key={index}
                  onClick={() => handleSlotClick(slot)}
                  className='flex py-2 px-4 my-2 mx-auto w-11/12 bg-secondary hover:bg-secondary/40 cursor-pointer hover:scale-[1.03] transition-all shadow-sm'
                >
                  {slot.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </Card>
              ))}
            </ScrollArea>
          </div>
        </div>
      </Card>
      <AvailabilityCheckerEventAddForm
        start={selectedSlotStart}
        end={selectedSlotEnd}
      />
    </div>
  )
}
