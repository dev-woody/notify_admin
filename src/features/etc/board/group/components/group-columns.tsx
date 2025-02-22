import { ColumnDef } from '@tanstack/react-table'
import { BoardGroup } from '@/data/schema/config/board/boardGroupSchema'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/common/table/column-header'
import { DataTableRowActions } from '@/components/common/table/row-actions'
import LongText from '@/components/long-text'

export const columns: ColumnDef<BoardGroup>[] = [
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
    id: 'boardGroupName',
    accessorKey: 'boardGroupName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='그룹명' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('boardGroupName')}</LongText>
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
    cell: DataTableRowActions<BoardGroup>,
  },
]

// meta: {
//   enableSearch: true,
//   filterOptions: [
//     { label: '운영', value: 'Y' },
//     { label: '미운영', value: 'N' },
//   ],
//   className: cn(
//     'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
//     'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
//     'sticky left-6 md:table-cell'
//   ),
// },
