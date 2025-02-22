import CustomCalendar from '@/components/common/calendar'
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { Main } from '@/components/layout/main'

export default function CalendarComponent() {
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
      title: '스케줄 관리',
      url: '',
    },
  ]

  return (
    <Main>
      <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
        <div>
          <BreadCrumbForm breadCrumbList={BreadCrumb} />
          <h2 className='text-2xl font-bold tracking-tight'>스케줄 관리</h2>
          {/* <p className='text-muted-foreground'>시공업자 목록을 확인하세요.</p> */}
        </div>
        {/* <AdOrgPrimaryButtons /> */}
      </div>
      <CustomCalendar />
    </Main>
  )
}
