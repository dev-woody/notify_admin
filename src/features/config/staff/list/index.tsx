import { useNavigate } from '@tanstack/react-router'
import { User } from '@/data/schema/users/userSchema'
import { useUserFindFromAdmin } from '@/queries/useUserQuery'
import { TableProvider } from '@/context/table-context'
import { CustomTable } from '@/components/common/table'
import { CustomDialogs } from '@/components/common/table/dialog/dialog'
import { PrimaryButtons } from '@/components/common/table/primary-button'
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { Main } from '@/components/layout/main'
import UserRegisterForm from './components/staff-create'
// import { AdOrgPrimaryButtons } from './components/ad-org-primary-buttons'
import { columns } from './components/staff-list-columns'

export default function StaffList() {
  const { data: users } = useUserFindFromAdmin({
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
      title: '직원 관리',
      url: '',
    },
    {
      title: '직원 현황',
      url: '',
    },
  ]

  const navigate = useNavigate()

  const onClickRow = (row: User) => {
    // navigate({ to: `/config/ad-org/${row.adOrg.adOrgUuid}` })
  }

  return (
    <TableProvider<User>>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <BreadCrumbForm breadCrumbList={BreadCrumb} />
            <h2 className='text-2xl font-bold tracking-tight'>직원현황</h2>
            {/* <p className='text-muted-foreground'>시공업자 목록을 확인하세요.</p> */}
          </div>
          <PrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CustomTable data={users} columns={columns} onClickRow={onClickRow} />
        </div>
      </Main>

      <CustomDialogs
        deleteKey='userName'
        registerKey='register'
        registerForm={<UserRegisterForm<User> submitKey='register' />}
        updateKey='update'
        updateForm={<div />}
      />
    </TableProvider>
  )
}
