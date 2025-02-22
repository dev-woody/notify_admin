import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Category } from '@/data/schema/product/categorySchema'
import { useCategoryFindById } from '@/queries/useCategoryQuery'
import { Route } from '@/routes/_authenticated/product/category/2nd'
import { useCategoryStore } from '@/stores/categoryStore'
import { TableProvider } from '@/context/table-context'
import { CustomTable } from '@/components/common/table'
import { CustomDialogs } from '@/components/common/table/dialog/dialog'
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { Main } from '@/components/layout/main'
import { columns } from './category-columns'

// import { AdOrgPrimaryButtons } from './components/ad-org-primary-buttons'

export default function Category2ndList() {
  const { categorys } = useCategoryStore()
  const { mutate: findById } = useCategoryFindById()

  const search = Route.useSearch()

  useEffect(() => {
    findById(search.i)
  }, [search])

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
    navigate({ to: `/product/category/3rd`, search: { i: row.categoryUuid } })
  }

  return (
    <TableProvider<Category>>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <BreadCrumbForm breadCrumbList={BreadCrumb} />
            <h2 className='text-2xl font-bold tracking-tight'>
              2차 카테고리 조회
            </h2>
            {/* <p className='text-muted-foreground'>시공업자 목록을 확인하세요.</p> */}
          </div>
          {/* <AdOrgPrimaryButtons /> */}
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CustomTable
            data={categorys}
            columns={columns}
            onClickRow={onClickRow}
          />
        </div>
      </Main>

      <CustomDialogs deleteKey='comName' />
    </TableProvider>
  )
}
