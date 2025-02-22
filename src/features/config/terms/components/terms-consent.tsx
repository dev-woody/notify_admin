import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export default function TermsConsent() {
  return (
    <Card className='h-full flex flex-col'>
      <CardHeader>
        <CardTitle>제 3자 개인정보 제공동의</CardTitle>
        <CardDescription>상세설명부분 </CardDescription>
      </CardHeader>
      <CardContent className='flex-1'>
        <div className='h-full'>
          <Textarea
            id='name'
            defaultValue='이용약관 내용...'
            className='h-full'
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button>저장</Button>
      </CardFooter>
    </Card>
  )
}
