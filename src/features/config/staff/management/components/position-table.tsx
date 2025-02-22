import { usePositionFindAll } from '@/queries/usePositionQuery'
import { CustomTable } from '@/components/common/table'
import { CustomDialogs } from '@/components/common/table/dialog/dialog'
import { columns } from './position-columns'
import PositionRegisterForm from './position-register'
import PositionUpdateForm from './position-update'

export default function PositionTable() {
  const { data: positions } = usePositionFindAll({
    page: 0,
    size: 20,
    desc: true,
  })

  return (
    <>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <CustomTable
          data={positions}
          columns={columns}
          // onClickRow={onClickRow}
        />
      </div>
      <CustomDialogs
        deleteKey='positionName'
        registerKey='register'
        registerForm={<PositionRegisterForm submitKey='register' />}
        updateKey='update'
        updateForm={<PositionUpdateForm submitKey='update' />}
      />
    </>
  )
}
