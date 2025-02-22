import { useNavigate, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export default function UnauthorisedError() {
  const navigate = useNavigate()
  const { history } = useRouter()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>401</h1>
        <span className='font-medium'>권한이 없습니다.</span>
        <p className='text-center text-muted-foreground'>
          다음 페이지에 접근하려면
          <br /> 로그인이 필요합니다.
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
