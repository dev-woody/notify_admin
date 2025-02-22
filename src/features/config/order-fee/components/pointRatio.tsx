import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function PointRatio() {
  return (
    <Card className='h-full flex flex-col'>
      <CardHeader>
        <CardTitle>적립금 설정</CardTitle>
        <CardDescription>
          사용자 구매 적립금 비율을 설정합니다.{' '}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1'>
        <div className='flex w-full max-w-sm items-center space-x-2'>
          <Input type='text' placeholder='적립율' />
          <Button type='submit'>저장</Button>
        </div>
      </CardContent>
    </Card>
  )
}
