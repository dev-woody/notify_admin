import { useEffect } from 'react'
import { TabsContent } from '@radix-ui/react-tabs'
import { useNavigate } from '@tanstack/react-router'
import { useClientFindByRole } from '@/queries/useClientQuery'
import { useClientStore } from '@/stores/clientStore'
import { TableProvider } from '@/context/table-context'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CustomDialogs } from '@/components/common/table/dialog/dialog'
import BreadCrumbForm from '@/components/layout/bread-crumb'
import { HeaderTitle } from '@/components/layout/header-title'
import { Main } from '@/components/layout/main'
import TermsCollecting from './components/terms-collecting'
import TermsConsent from './components/terms-consent'
import TermsEletronic from './components/terms-electronic'
import TermsPersonal from './components/terms-personal'
import TermsPublicity from './components/terms-publicity'
import TermsService from './components/terms-service'

// import { AdOrgPrimaryButtons } from './components/ad-org-primary-buttons'

export default function Terms() {
  const { clients } = useClientStore()
  const { mutate: findByRole } = useClientFindByRole()

  useEffect(() => {
    findByRole({ page: 0, size: 20, desc: true, roleName: 'admin' })
  }, [])

  const BreadCrumb = [
    {
      title: '홈',
      url: '/',
    },
    {
      title: '약관설정/개인정보 설정',
      url: '',
    },
  ]

  const navigate = useNavigate()

  // const onClickRow = (row: Client) => {
  //   navigate({ to: `/config/ad-org/${row.adOrg.adOrgUuid}` })
  // }

  const tabsTriggerList: ItemsPeoperties[] = [
    {
      value: 'service',
      label: '서비스 이용약관',
    },
    {
      value: 'personal-info',
      label: '개인정보 처리방침',
    },
    {
      value: 'electronic-financial',
      label: '전자금융거래 이용약관',
    },
    {
      value: 'collecting-personal-info',
      label: '개인정보수집 및 이용동의',
    },
    {
      value: 'consent-third-party',
      label: '제 3자 개인정보 제공동의',
    },
    {
      value: 'publicity-marketing',
      label: '홍보 및 마케팅 이용약관',
    },
  ]

  return (
    // <TableProvider<Client>>
    <Main fixed>
      <HeaderTitle title='약관설정/개인정보 설정' breadCrumbList={BreadCrumb} />
      <Tabs
        defaultValue='service'
        className='flex -mx-4 flex-1 overflow-hidden px-4 py-1 flex-col space-y-2'
      >
        <TabsList className='flex flex-wrap w-full h-auto justify-start'>
          {tabsTriggerList.map((item) => (
            <TabsTrigger value={item.value}>{item.label}</TabsTrigger>
          ))}
        </TabsList>
        <div className='flex-grow'>
          {tabsTriggerList.map((item) => (
            <TabsContent key={item.value} value={item.value} className='h-full'>
              {item.value === 'service' && <TermsService />}
              {item.value === 'personal-info' && <TermsPersonal />}
              {item.value === 'electronic-financial' && <TermsEletronic />}
              {item.value === 'collecting-personal-info' && <TermsCollecting />}
              {item.value === 'consent-third-party' && <TermsConsent />}
              {item.value === 'publicity-marketing' && <TermsPublicity />}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </Main>

    // </TableProvider>
  )
}
