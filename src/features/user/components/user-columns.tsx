import { ColumnDef } from '@tanstack/react-table'
import { User } from '@/data/schema/userSchema'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/common/table/column-header'
import { DataTableRowActions } from '@/components/common/table/row-actions'
import LongText from '@/components/long-text'

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
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='아이디' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('email')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='이름' />
    ),
    meta: {
      className: 'w-60',
    },
    cell: ({ row }) => (
      <LongText className='max-w-60'>{row.getValue('name')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='전화번호' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('phone')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='권한' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.original.admin?.role}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'updatedAt',
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='수정일' />
    ),
    cell: ({ row }) => <div>{row.getValue('updatedAt')}</div>,

    enableSorting: false,
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='생성일' />
    ),
    cell: ({ row }) => <div>{row.getValue('createdAt')}</div>,

    enableSorting: false,
  },
  {
    id: 'actions',
    meta: {
      className: '',
      disableClick: true,
    },
    cell: DataTableRowActions<any>,
  },
]
