import { ColumnDef } from '@tanstack/react-table'
import { Category } from '@/data/schema/product/categorySchema'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/common/table/column-header'
import { DataTableRowActions } from '@/components/common/table/row-actions'
import LongText from '@/components/long-text'

// import { callTypes, userTypes } from '../data/data'

export const columns: ColumnDef<Category>[] = [
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
    id: 'thumbnailImages',
    accessorKey: 'thumbnailImages',
    accessorFn: (row) => row.thumbnail?.imageUrl,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='이미지' />
    ),
    meta: { className: cn() },
    cell: ({ row }) => (
      <img src={row.original.thumbnail?.imageUrl} className='max-w-36' />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'categoryName',
    accessorKey: 'categoryName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='카테고리명' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('categoryName')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'subCategories',
    accessorKey: 'subCategories',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='하위카테고리' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>
        {row.original?.subCategories?.length}
      </LongText>
    ),
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
    cell: ({ row }) => <div>{row.original?.updatedAt}</div>,
    enableSorting: false,
  },
  {
    id: '생성일',
    accessorKey: 'createdAt',
    accessorFn: (row) => row.createdAt,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='생성일' />
    ),
    cell: ({ row }) => <div>{row.original?.createdAt}</div>,
    enableSorting: false,
  },
  {
    id: 'actions',
    meta: {
      className: '',
      disableClick: true,
    },
    cell: DataTableRowActions<Category>,
  },
]
