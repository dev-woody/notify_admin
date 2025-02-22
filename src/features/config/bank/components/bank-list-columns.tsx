import { ColumnDef } from '@tanstack/react-table'
import { Board } from '@/data/schema/config/board/boardSchema'
import { cn } from '@/lib/utils'
import { changePhone } from '@/utils/function/change-charcter'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/common/table/column-header'
import { DataTableRowActions } from '@/components/common/table/row-actions'
import LongText from '@/components/long-text'

// import { callTypes, userTypes } from '../data/data'
export const columns: ColumnDef<Board>[] = [
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
    id: 'title',
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='은행명' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('title')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='계좌번호' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('description')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'subDescription',
    accessorKey: 'subDescription',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='예금주' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('subDescription')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'isActive',
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='사용유무' />
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
    cell: DataTableRowActions<Board>,
  },
]
