import { useNavigate } from '@tanstack/react-router'
import { BoardGroup } from '@/data/schema/config/board/boardGroupSchema'
import { useBoardGroupFindAll } from '@/queries/board/useBoardGroupQuery'
import { TableProvider } from '@/context/table-context'
import { CustomTable } from '@/components/common/table'
import { CustomDialogs } from '@/components/common/table/dialog/dialog'
import { PrimaryButtons } from '@/components/common/table/primary-button'
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { Main } from '@/components/layout/main'
import BoardGroupRegisterForm from './components/board-group-register'
import { columns } from './components/group-columns'

// import { AdOrgPrimaryButtons } from './components/ad-org-primary-buttons'

export default function BoardGroupComponent() {
  const { data: group } = useBoardGroupFindAll({
    page: 0,
    size: 20,
    desc: true,
  })

  const BreadCrumb = [
    {
      title: '홈',
      url: '/',
    },
    {
      title: '기타관리',
      url: '',
    },
    {
      title: '게시판그룹 관리',
      url: '',
    },
  ]

  const navigate = useNavigate()

  // const onClickRow = (row: Client) => {
  //   navigate({ to: `/config/ad-org/${row.adOrg.adOrgUuid}` })
  // }

  return (
    <TableProvider<BoardGroup>>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <BreadCrumbForm breadCrumbList={BreadCrumb} />
            <h2 className='text-2xl font-bold tracking-tight'>
              게시판그룹 관리
            </h2>
            {/* <p className='text-muted-foreground'>시공업자 목록을 확인하세요.</p> */}
          </div>
          <PrimaryButtons<BoardGroup> />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CustomTable data={group} columns={columns} />
        </div>
      </Main>

      <CustomDialogs
        deleteKey='boardGroupName'
        registerForm={<BoardGroupRegisterForm />}
        updateForm={<div />}
      />
    </TableProvider>
  )
}
