import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AvailabilityChecker from './components/availability-checker'
import Calendar from './components/calendar'
import { EventsProvider } from './context/events-context'

export default function CustomCalendar() {
  return (
    <EventsProvider>
      <div className='py-4'>
        <Tabs
          defaultValue='calendar'
          className='flex flex-col w-full items-start justify-start'
        >
          <TabsList className='flex justify-center mb-2'>
            <TabsTrigger value='calendar'>캘린더</TabsTrigger>
            <TabsTrigger value='schedulingAssistant'>스케줄 관리</TabsTrigger>
          </TabsList>
          <TabsContent value='calendar' className='w-full space-y-5'>
            <Separator />
            <Calendar />
          </TabsContent>
          <TabsContent value='schedulingAssistant' className='w-full space-y-5'>
            <Separator />
            <AvailabilityChecker />
          </TabsContent>
        </Tabs>
      </div>
    </EventsProvider>
  )
}
