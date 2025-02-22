import { useNavigate } from '@tanstack/react-router'
import { AdOrg } from '@/data/schema/users/adOrgSchema'
import { useAdOrgFindAll } from '@/queries/useAdOrgQuery'
import { TableProvider } from '@/context/table-context'
import { CustomTable } from '@/components/common/table'
import { CustomDialogs } from '@/components/common/table/dialog/dialog'
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { Main } from '@/components/layout/main'
import { columns } from './components/ad-org-columns'
import { AdOrgPrimaryButtons } from './components/ad-org-primary-buttons'
import { AdOrgRegisterForm } from './components/ad-org-register'
import { AdOrgUpdateForm } from './components/ad-org-update'

export default function AdOrgConmponent() {
  const { data: adOrgs } = useAdOrgFindAll({ page: 0, size: 20, desc: true })

  const BreadCrumb = [
    {
      title: '홈',
      url: '/',
    },
    {
      title: '영업소 관리',
      url: '',
    },
    {
      title: '영업소 현황',
      url: '',
    },
  ]

  const navigate = useNavigate()

  const onClickRow = (row: AdOrg) => {
    navigate({ to: `/config/ad-org/${row.adOrgUuid}` })
  }

  return (
    <TableProvider<AdOrg>>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <BreadCrumbForm breadCrumbList={BreadCrumb} />
            <h2 className='text-2xl font-bold tracking-tight'>영업소 현황</h2>
            {/* <p className='text-muted-foreground'>시공업자 목록을 확인하세요.</p> */}
          </div>
          <AdOrgPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CustomTable
            data={adOrgs}
            columns={columns}
            onClickRow={onClickRow}
          />
        </div>
      </Main>

      <CustomDialogs
        deleteKey='comName'
        registerKey='ad-org-register'
        registerForm={<AdOrgRegisterForm<AdOrg> submitKey='ad-org-register' />}
        updateKey='ad-org-update'
        updateForm={<AdOrgUpdateForm submitKey='ad-org-update' />}
      />
    </TableProvider>
  )
}
