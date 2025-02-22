import { ColumnDef } from '@tanstack/react-table'
import { Position } from '@/data/schema/users/position'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/common/table/column-header'
import { DataTableRowActions } from '@/components/common/table/row-actions'
import LongText from '@/components/long-text'

// import { callTypes, userTypes } from '../data/data'

export const columns: ColumnDef<Position>[] = [
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
    id: '직급',
    accessorKey: 'positionName',
    accessorFn: (row) => row.positionName,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='직급' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-[50%]'>{row.original.positionName}</LongText>
    ),
    meta: { className: '', enableSearch: true },
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
  {
    id: 'actions',
    meta: {
      className: '',
      disableClick: true,
    },
    cell: DataTableRowActions<Position>,
  },
]
