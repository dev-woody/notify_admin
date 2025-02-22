import { useNavigate } from '@tanstack/react-router'
import { Category } from '@/data/schema/product/categorySchema'
import { useCategoryFindByDepth } from '@/queries/product/useCategoryQuery'
import { TableProvider } from '@/context/table-context'
import { CustomTable } from '@/components/common/table'
import { CustomDialogs } from '@/components/common/table/dialog/dialog'
import { PrimaryButtons } from '@/components/common/table/primary-button'
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { Main } from '@/components/layout/main'
import { columns } from './components/category-columns'
import CategoryRegisterForm from './components/category-register'

// import { AdOrgPrimaryButtons } from './components/ad-org-primary-buttons'

export default function Category1stList() {
  const { data: categories } = useCategoryFindByDepth('1')

  const BreadCrumb = [
    {
      title: '홈',
      url: '/',
    },
    {
      title: '자재관리',
      url: '',
    },
    {
      title: '카테고리',
      url: '',
    },
  ]

  const navigate = useNavigate()

  const onClickRow = (row: Category) => {
    navigate({ to: `/product/category/2nd`, search: { i: row.categoryUuid } })
  }

  return (
    <TableProvider<Category>>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <BreadCrumbForm breadCrumbList={BreadCrumb} />
            <h2 className='text-2xl font-bold tracking-tight'>
              1차 카테고리 조회
            </h2>
            {/* <p className='text-muted-foreground'>시공업자 목록을 확인하세요.</p> */}
          </div>
          <PrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CustomTable
            data={categories}
            columns={columns}
            onClickRow={onClickRow}
          />
        </div>
      </Main>

      <CustomDialogs
        deleteKey='categoryName'
        registerForm={<CategoryRegisterForm />}
        updateForm={<div />}
      />
    </TableProvider>
  )
}
