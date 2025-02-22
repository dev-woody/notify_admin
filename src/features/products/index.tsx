import { useNavigate } from '@tanstack/react-router'
import { IconUserPlus } from '@tabler/icons-react'
import { Product } from '@/data/schema/product/productSchema'
import { useProductFindAll } from '@/queries/product/useProductQuery'
import { TableProvider } from '@/context/table-context'
import { Button } from '@/components/ui/button'
import { CustomTable } from '@/components/common/table'
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { Main } from '@/components/layout/main'
import { columns } from './components/product-columns'

export default function ProductList() {
  const { data: products } = useProductFindAll({
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
      title: '자재관리',
      url: '',
    },
    {
      title: '자재목록',
      url: '',
    },
  ]

  const navigate = useNavigate()

  const onClickBTN = () => {
    navigate({ to: `/product/registration` })
  }

  return (
    <TableProvider<Product>>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <BreadCrumbForm breadCrumbList={BreadCrumb} />
            <h2 className='text-2xl font-bold tracking-tight'>자재목록 조회</h2>
            {/* <p className='text-muted-foreground'>시공업자 목록을 확인하세요.</p> */}
          </div>
          <Button onClick={onClickBTN}>
            <span>추가</span> <IconUserPlus size={18} />
          </Button>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CustomTable
            data={products?.content}
            columns={columns}
            // onClickRow={onClickRow}
          />
        </div>
      </Main>

      {/* <CustomDialogs deleteKey='productName' /> */}
    </TableProvider>
  )
}
