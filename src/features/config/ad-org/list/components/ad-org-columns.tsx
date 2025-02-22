import { ColumnDef } from '@tanstack/react-table'
import { AdOrg } from '@/data/schema/users/adOrgSchema'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/common/table/column-header'
import { DataTableRowActions } from '@/components/common/table/row-actions'
import LongText from '@/components/long-text'

export const columns: ColumnDef<AdOrg>[] = [
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
  {
    id: '소속',
    accessorKey: 'adOrg',
    accessorFn: (row) => row.orgName,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='소속' />
    ),
    cell: ({ row }) => {
      const adorg = row.original.orgName
      const badgeColor =
        adorg === '본사'
          ? 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'
          : 'bg-neutral-300/40 border-neutral-300'

      return (
        <Badge variant='outline' className={cn('capitalize', badgeColor)}>
          <LongText className='max-w-36'>{adorg}</LongText>
        </Badge>
      )
    },
    // meta: {
    // enableSearch: true,
    // filterOptions: [
    //   { label: '본사', value: '본사' },
    //   { label: '지점A', value: '지점A' },
    //   { label: '지점B', value: '지점B' },
    // ],
    // className: cn(
    //   'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
    //   'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
    //   'sticky left-6 md:table-cell'
    // ),
    // },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'areaName',
    accessorKey: 'areaName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='지역명' />
    ),
    // cell: ({ row }) => {
    //   const { firstName, lastName } = row.original
    //   const fullName = `${firstName} ${lastName}`
    //   return <LongText className='max-w-36'>{fullName}</LongText>
    // },
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('areaName')}</LongText>
    ),
    // meta: { className: 'w-36' },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'mailOrderNumber',
    accessorKey: 'mailOrderNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='통신판매업 신고번호' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('mailOrderNumber')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'receiptEmail',
    accessorKey: 'receiptEmail',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='전자세금 수신메일' />
    ),
    // meta: { className: 'w-36' },
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('receiptEmail')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'pimName',
    accessorKey: 'pimName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='담당자명' />
    ),
    cell: ({ row }) => <div>{row.getValue('pimName')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'pimEmail',
    accessorKey: 'pimEmail',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='담당자 이메일' />
    ),
    cell: ({ row }) => <div>{row.getValue('pimEmail')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: '운영상태',
    accessorKey: 'isActive',
    accessorFn: (row) => row.isActive,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='운영' />
    ),
    cell: ({ row }) => {
      const active = row.original.isActive
      const badgeColor = active
        ? 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'
        : 'bg-neutral-300/40 border-neutral-300'

      return (
        <Badge variant='outline' className={cn('capitalize', badgeColor)}>
          <LongText className='max-w-36'>{active ? '운영' : '미운영'}</LongText>
        </Badge>
      )
    },
    meta: {
      enableSearch: true,
      filterOptions: [
        { label: '운영', value: 'Y' },
        { label: '미운영', value: 'N' },
      ],
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: '수정일',
    accessorKey: 'updatedAt',
    accessorFn: (row) => row.updatedAt,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='수정일' />
    ),
    cell: ({ row }) => <div>{row.original.updatedAt}</div>,
    enableSorting: false,
  },
  {
    id: '생성일',
    accessorKey: 'createdAt',
    accessorFn: (row) => row.createdAt,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='생성일' />
    ),
    cell: ({ row }) => <div>{row.original.createdAt}</div>,
    enableSorting: false,
  },
  {
    id: 'actions',
    meta: {
      className: '',
      disableClick: true,
    },
    cell: DataTableRowActions<AdOrg>,
  },
]
