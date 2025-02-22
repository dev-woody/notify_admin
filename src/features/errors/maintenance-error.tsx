import { Button } from '@/components/ui/button'

export default function MaintenanceError() {
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>503</h1>
        <span className='font-medium'>서버가 점검중에 있습니다.</span>
        <p className='text-center text-muted-foreground'>
          현재 서버가 점검 중에 있습니다. <br />
          점검 후에 접속이 가능합니다.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline'>연락하기</Button>
        </div>
      </div>
    </div>
  )
}
