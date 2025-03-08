import { useNavigate } from '@tanstack/react-router'
import { IconUserPlus } from '@tabler/icons-react'
import { useCampaignList } from '@/queries/useCampaignQuery'
// import { User } from '@/data/schema/users/userSchema'
import { TableProvider } from '@/context/table-context'
import { Button } from '@/components/ui/button'
import { CustomTable } from '@/components/common/table'
import { CustomDialogs } from '@/components/common/table/dialog/dialog'
import { PrimaryButtons } from '@/components/common/table/primary-button'
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { Main } from '@/components/layout/main'
import { columns } from './components/client-columns'

// import { AdOrgPrimaryButtons } from './components/ad-org-primary-buttons'

export default function ClientList() {
  const { data: campaign } = useCampaignList({ page: 0, size: 10, desc: false })
  const BreadCrumb = [
    {
      title: '홈',
      url: '/',
    },
    {
      title: '업체관리',
      url: '',
    },
  ]

  const navigate = useNavigate()

  // const onClickRow = (row: User) => {
  // navigate({ to: `/}` })
  // }

  return (
    <TableProvider<any>>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <BreadCrumbForm breadCrumbList={BreadCrumb} />
            <h2 className='text-2xl font-bold tracking-tight'>업체관리</h2>
            {/* <p className='text-muted-foreground'>시공업자 목록을 확인하세요.</p> */}
          </div>
          <div className='flex gap-2'>
            <Button
              className='space-x-1'
              onClick={() => navigate({ to: `/client/register` })}
            >
              <span>추가</span> <IconUserPlus size={18} />
            </Button>
          </div>{' '}
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CustomTable data={campaign?.content} columns={columns} />
        </div>
      </Main>

      {/* <CustomDialogs deleteKey='comName' /> */}
    </TableProvider>
  )
}
