import { useNavigate } from '@tanstack/react-router'
import { TableProvider } from '@/context/table-context'
import { CustomTable } from '@/components/common/table'
import { CustomDialogs } from '@/components/common/table/dialog/dialog'
import { PrimaryButtons } from '@/components/common/table/primary-button'
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { Main } from '@/components/layout/main'
import { columns } from './components/notice-columns'

// import { AdOrgPrimaryButtons } from './components/ad-org-primary-buttons'

export default function NoticeList() {
  const BreadCrumb = [
    {
      title: '홈',
      url: '/',
    },
    {
      title: '공지사항',
      url: '',
    },
  ]

  const navigate = useNavigate()

  // const onClickRow = (row: Notice) => {
  // navigate({ to: `/}` })
  // }

  return (
    <TableProvider<any>>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <BreadCrumbForm breadCrumbList={BreadCrumb} />
            <h2 className='text-2xl font-bold tracking-tight'>공지사항</h2>
            {/* <p className='text-muted-foreground'>시공업자 목록을 확인하세요.</p> */}
          </div>
          <PrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CustomTable data={[]} columns={columns} />
        </div>
      </Main>

      <CustomDialogs
        deleteKey='noticeName'
        registerForm={<></>}
        updateForm={<></>}
      />
    </TableProvider>
  )
}
