import { ColumnDef } from '@tanstack/react-table'
import { Board } from '@/data/schema/config/board/boardSchema'
import { BoardType } from '@/data/schema/config/board/boardTypeSchema'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/common/table/column-header'
import { DataTableRowActions } from '@/components/common/table/row-actions'
import LongText from '@/components/long-text'

// import { callTypes, userTypes } from '../data/data'

export const columns: ColumnDef<BoardType>[] = [
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
    id: 'typeName',
    accessorKey: 'typeName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='속성이름' />
    ),
    cell: ({ row }) => <LongText>{row.getValue('typeName')}</LongText>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'uploadImgYn',
    accessorKey: 'uploadImgYn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='이미지사용 여부' />
    ),
    cell: ({ row }) => <div>{row.getValue('uploadImgYn')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'commentYn',
    accessorKey: 'commentYn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='댓글사용 여부' />
    ),
    cell: ({ row }) => <div>{row.getValue('commentYn')}</div>,
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
    cell: DataTableRowActions<BoardType>,
  },
]
