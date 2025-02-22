import { ColumnDef } from '@tanstack/react-table'
import { User } from '@/data/schema/users/userSchema'
import { cn } from '@/lib/utils'
import { changePhone } from '@/utils/function/change-charcter'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/common/table/column-header'
import { DataTableRowActions } from '@/components/common/table/row-actions'
import LongText from '@/components/long-text'

// import { callTypes, userTypes } from '../data/data'

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      disableClick: true,
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   id: '소속',
  //   accessorKey: 'adOrg',
  //   accessorFn: (row) => row.adOrg?.orgName,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='소속' />
  //   ),
  //   cell: ({ row }) => {
  //     const adorg = row.original.adOrg.orgName
  //     const badgeColor =
  //       adorg === '본사'
  //         ? 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'
  //         : 'bg-neutral-300/40 border-neutral-300'

  //     return (
  //       <Badge variant='outline' className={cn('capitalize', badgeColor)}>
  //         <LongText className='max-w-36'>{adorg}</LongText>
  //       </Badge>
  //     )
  //   },
  //   meta: {
  //     enableSearch: true,
  //     filterOptions: [
  //       { label: '본사', value: '본사' },
  //       { label: '지점A', value: '지점A' },
  //       { label: '지점B', value: '지점B' },
  //     ],
  //     className: cn(
  //       'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
  //       'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
  //       'sticky left-6 md:table-cell'
  //     ),
  //   },
  //   enableHiding: false,
  // },
  {
    id: '이름',
    accessorKey: 'userName',
    accessorFn: (row) => row.userName,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='이름' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.original.userName}</LongText>
    ),
    meta: { className: '', enableSearch: true },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'userInfo',
    accessorKey: 'userInfo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='부서 / 직책' />
    ),
    cell: ({ row }) => {
      const { department, position } = row.original
      const userInfo = `${department.departmentName} / ${position.positionName}`
      return <LongText className='max-w-36'>{userInfo}</LongText>
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'userId',
    accessorKey: 'userId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='회원아이디' />
    ),
    cell: ({ row }) => <div>{row.getValue('userId')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='휴대전화' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>
        {changePhone(row.getValue('phone'))}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='이메일' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('email')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'isActive',
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='재직상태' />
    ),
    cell: ({ row }) => {
      const badgeColor =
        row.getValue('isActive') === 'Y'
          ? 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'
          : 'bg-red-300/40 border-red-300'

      return (
        <Badge variant='outline' className={cn('capitalize', badgeColor)}>
          <div className='w-fit text-nowrap'>{row.getValue('isActive')}</div>
        </Badge>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: '생성일',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='생성일' />
    ),
    cell: ({ row }) => <div>{row.original.createdAt}</div>,
  },
  {
    id: '수정일',
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='수정일' />
    ),
    cell: ({ row }) => <div>{row.original.updatedAt}</div>,
  },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Status' />
  //   ),
  //   cell: ({ row }) => {
  //     const { status } = row.original
  //     const badgeColor = callTypes.get(status)
  //     return (
  //       <div className='flex space-x-2'>
  //         <Badge variant='outline' className={cn('capitalize', badgeColor)}>
  //           {row.getValue('status')}
  //         </Badge>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  //   enableHiding: false,
  //   enableSorting: false,
  // },
  // {
  //   accessorKey: 'role',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Role' />
  //   ),
  //   cell: ({ row }) => {
  //     const { role } = row.original
  //     const userType = userTypes.find(({ value }) => value === role)

  //     if (!userType) {
  //       return null
  //     }

  //     return (
  //       <div className='flex gap-x-2 items-center'>
  //         {userType.icon && (
  //           <userType.icon size={16} className='text-muted-foreground' />
  //         )}
  //         <span className='capitalize text-sm'>{row.getValue('role')}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: 'actions',
    meta: {
      className: '',
      disableClick: true,
    },
    cell: DataTableRowActions<User>,
  },
]
