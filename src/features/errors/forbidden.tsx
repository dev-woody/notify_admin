import { useNavigate, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export default function ForbiddenError() {
  const navigate = useNavigate()
  const { history } = useRouter()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>403</h1>
        <span className='font-medium'>인증되지 않은 회원입니다.</span>
        <p className='text-center text-muted-foreground'>
          권한이 필요한 페이지입니다.
          <br />
          로그인 후 다시 접속해주세요.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => history.go(-1)}>
            이전 페이지
          </Button>
          <Button onClick={() => navigate({ to: '/' })}>메인으로</Button>
        </div>
      </div>
    </div>
  )
}
