import { IconUserPlus } from '@tabler/icons-react'
import { useCustom } from '@/context/table-context'
import { Button } from '@/components/ui/button'

export function AdOrgPrimaryButtons() {
  const { setOpen } = useCustom()
  return (
    <div className='flex gap-2'>
      {/* <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>초대</span> <IconMailPlus size={18} />
      </Button> */}
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>추가</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
