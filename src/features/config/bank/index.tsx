import { useNavigate } from '@tanstack/react-router'
import { Board } from '@/data/schema/config/board/boardSchema'
import { TableProvider } from '@/context/table-context'
import { CustomTable } from '@/components/common/table'
import { CustomDialogs } from '@/components/common/table/dialog/dialog'
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { Main } from '@/components/layout/main'
// import { AdOrgPrimaryButtons } from './components/ad-org-primary-buttons'
import { columns } from './components/bank-list-columns'

export default function BankList() {
  // const { data: bankList } = useBoard

  const BreadCrumb = [
    {
      title: '홈',
      url: '/',
    },
    {
      title: '무통장/계좌 설정',
      url: '',
    },
  ]

  const navigate = useNavigate()

  const onClickRow = (row: Board) => {
    // navigate({ to: `/config/ad-org/${row.adOrg.adOrgUuid}` })
  }

  return (
    <TableProvider<Board>>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <BreadCrumbForm breadCrumbList={BreadCrumb} />
            <h2 className='text-2xl font-bold tracking-tight'>
              무통장/계좌 설정
            </h2>
            {/* <p className='text-muted-foreground'>시공업자 목록을 확인하세요.</p> */}
          </div>
          {/* <AdOrgPrimaryButtons /> */}
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CustomTable data={[]} columns={columns} onClickRow={onClickRow} />
        </div>
      </Main>

      <CustomDialogs deleteKey='userName' />
    </TableProvider>
  )
}
