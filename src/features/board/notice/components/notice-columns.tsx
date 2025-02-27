import { ColumnDef } from '@tanstack/react-table'
// import { User } from '@/data/schema/users/userSchema'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/common/table/column-header'
import { DataTableRowActions } from '@/components/common/table/row-actions'
import LongText from '@/components/long-text'

// import { callTypes, userTypes } from '../data/data'

export const columns: ColumnDef<any>[] = [
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
    id: 'index',
    accessorKey: 'index',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='번호' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('index')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: '구분',
    accessorKey: 'paymentType',
    accessorFn: (row) => row?.paymentType,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='구분' />
    ),
    meta: {
      className: '',
      filterOptions: [
        { label: '등록업체', value: 'O' },
        { label: '검수중', value: 'C' },
        { label: '결제업체', value: 'P' },
      ],
    },
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('paymentType')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'clientName',
    accessorKey: 'clientName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='업체명' />
    ),
    meta: {
      className: 'w-60',
    },
    cell: ({ row }) => (
      <LongText className='max-w-60'>{row.getValue('clientName')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'amount',
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='회차' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('amount')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='업종' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('type')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='연락처' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('phone')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'manager',
    accessorKey: 'manager',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='2차 담당자' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('manager')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   id: 'updatedAt',
  //   accessorKey: 'updatedAt',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='수정일' />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue('updatedAt')}</div>,

  //   enableSorting: false,
  // },
  // {
  //   id: 'createdAt',
  //   accessorKey: 'createdAt',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='생성일' />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue('createdAt')}</div>,

  //   enableSorting: false,
  // },
  {
    id: 'actions',
    meta: {
      className: '',
      disableClick: true,
    },
    cell: DataTableRowActions<any>,
  },
]
