import { useNavigate, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export default function NotFoundError() {
  const navigate = useNavigate()
  const { history } = useRouter()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
        <span className='font-medium'>잘못된 경로입니다.</span>
        <p className='text-center text-muted-foreground'>
          존재하지 않는 페이지입니다.
          <br />
          다른 경로를 이용해주세요.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => history.go(-1)}>
            뒤로가기
          </Button>
          <Button onClick={() => navigate({ to: '/' })}>홈으로</Button>
        </div>
      </div>
    </div>
  )
}
