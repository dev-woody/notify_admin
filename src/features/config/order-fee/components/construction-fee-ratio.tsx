import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function ConstructionFeeRatio() {
  return (
    <Card className='h-full flex flex-col'>
      <CardHeader>
        <CardTitle>시공정산금 설정</CardTitle>
        <CardDescription>
          시공 후 정산금 마진에 대한 설정입니다.{' '}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1'>
        <div className='flex w-full max-w-sm items-center space-x-2'>
          <Input type='text' placeholder='시공정산금' />
          <Button type='submit'>저장</Button>
        </div>
      </CardContent>
    </Card>
  )
}
