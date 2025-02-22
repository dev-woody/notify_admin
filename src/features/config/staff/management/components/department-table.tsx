import { useDepartmentFindAll } from '@/queries/useDepartmentQuery'
import { CustomTable } from '@/components/common/table'
import { CustomDialogs } from '@/components/common/table/dialog/dialog'
import { columns } from './department-columns'
import DepartmentRegisterForm from './department-register'
import DepartmentUpdateForm from './department-update'

export default function DepartmentTable() {
  const { data: departments } = useDepartmentFindAll({
    page: 0,
    size: 20,
    desc: true,
  })

  return (
    <>
      <div className='w-full flex justify-end'></div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <CustomTable data={departments} columns={columns} />
      </div>
      <CustomDialogs
        deleteKey='departmentName'
        registerForm={<DepartmentRegisterForm />}
        updateForm={<DepartmentUpdateForm submitKey='update' />}
      />
    </>
  )
}
