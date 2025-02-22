import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { User } from '@/data/schema/users/userSchema'
import { useUserFindByRoleName } from '@/queries/useUserQuery'
import { TableProvider } from '@/context/table-context'
import { Skeleton } from '@/components/ui/skeleton'
import { CustomTable } from '@/components/common/table'
import { CustomDialogs } from '@/components/common/table/dialog/dialog'
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { Main } from '@/components/layout/main'
// import { AdOrgPrimaryButtons } from './components/ad-org-primary-buttons'
import { columns } from './components/staff-role-columns'

export default function StaffRole() {
  const { data: users } = useUserFindByRoleName({
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
      title: '직원 권한',
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
            <h2 className='text-2xl font-bold tracking-tight'>
              {' '}
              관리시스템 담당자 설정
            </h2>
            {/* <p className='text-muted-foreground'>시공업자 목록을 확인하세요.</p> */}
          </div>
          {/* <AdOrgPrimaryButtons /> */}
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CustomTable
            // data={[]}
            data={users}
            columns={columns}
            onClickRow={onClickRow}
          />
        </div>
      </Main>

      <CustomDialogs
        deleteKey='userName'
        registerKey='register'
        registerForm={<div />}
        updateKey='update'
        updateForm={<div />}
      />
    </TableProvider>
  )
}
