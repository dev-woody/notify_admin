import { TabsContent } from '@radix-ui/react-tabs'
import { useNavigate } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HeaderTitle } from '@/components/layout/header-title'
import { Main } from '@/components/layout/main'
import ConstructionFeeRatio from './components/construction-fee-ratio'
import PointRatio from './components/pointRatio'

export default function OrderFee() {
  const BreadCrumb = [
    {
      title: '홈',
      url: '/',
    },
    {
      title: '발주수수료 관리',
      url: '',
    },
  ]

  const navigate = useNavigate()

  const tabsTriggerList: ItemsPeoperties[] = [
    {
      value: 'point',
      label: '적립금 설정',
    },
    {
      value: 'construction-fee',
      label: '시공정산금 설정',
    },
  ]

  return (
    // <TableProvider<Client>>
    <Main fixed>
      <HeaderTitle title='발주수수료 관리' breadCrumbList={BreadCrumb} />
      <Tabs defaultValue='point' className='space-y-2'>
        <TabsList className=''>
          {tabsTriggerList.map((item) => (
            <TabsTrigger value={item.value}>{item.label}</TabsTrigger>
          ))}
        </TabsList>
        <div className='flex-grow'>
          {tabsTriggerList.map((item) => (
            <TabsContent key={item.value} value={item.value} className='h-full'>
              {item.value === 'point' && <PointRatio />}
              {item.value === 'construction-fee' && <ConstructionFeeRatio />}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </Main>

    // </TableProvider>
  )
}
