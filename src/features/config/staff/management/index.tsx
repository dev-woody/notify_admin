import { useState } from 'react'
import { TabsContent } from '@radix-ui/react-tabs'
import { useNavigate } from '@tanstack/react-router'
import { Department } from '@/data/schema/users/department'
import { Position } from '@/data/schema/users/position'
import { TableProvider } from '@/context/table-context'
// Adjust the import path as necessary
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PrimaryButtons } from '@/components/common/table/primary-button'
import { HeaderTitle } from '@/components/layout/header-title'
import { Main } from '@/components/layout/main'
import DepartmentTable from './components/department-table'
import PositionTable from './components/position-table'
import { StaffPrimaryButtons } from './components/staff-primary-buttons'

type TabType = 'department' | 'position'

type TabToTypeMap = {
  department: Department
  position: Position
}

// import { AdOrgPrimaryButtons } from './components/ad-org-primary-buttons'

export default function SteffManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('department')

  const BreadCrumb = [
    {
      title: '홈',
      url: '/',
    },
    {
      title: '직원관리 코드설정',
      url: '',
    },
  ]

  const navigate = useNavigate()

  // const onClickRow = (row: Client) => {
  //   navigate({ to: `/config/ad-org/${row.adOrg.adOrgUuid}` })
  // }

  const tabsTriggerList: ItemsPeoperties[] = [
    {
      value: 'department',
      label: '부서 관리',
    },
    {
      value: 'position',
      label: '직급 관리',
    },
  ]

  return (
    <TableProvider<TabToTypeMap[typeof activeTab]>>
      <Main fixed>
        <HeaderTitle title='직원관리 코드설정' breadCrumbList={BreadCrumb} />
        <Tabs
          defaultValue='department'
          className='space-y-2'
          onValueChange={(value: any) => setActiveTab(value)}
        >
          <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
            <div>
              <TabsList>
                {tabsTriggerList.map((item) => (
                  <TabsTrigger value={item.value}>{item.label}</TabsTrigger>
                ))}
              </TabsList>
            </div>
            <PrimaryButtons />
          </div>
          <div className='flex-grow'>
            {tabsTriggerList.map((item) => (
              <TabsContent
                key={item.value}
                value={item.value}
                className='h-full'
              >
                {item.value === 'department' && <DepartmentTable />}
                {item.value === 'position' && <PositionTable />}
                {/* {item.value === 'position' && <></>} */}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </Main>
    </TableProvider>
  )
}
