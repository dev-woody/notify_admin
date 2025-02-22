import { ColumnDef } from '@tanstack/react-table'
import { Product } from '@/data/schema/product/productSchema'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/common/table/column-header'
import { DataTableRowActions } from '@/components/common/table/row-actions'
import LongText from '@/components/long-text'

// import { callTypes, userTypes } from '../data/data'

export const columns: ColumnDef<Product>[] = [
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
    accessorFn: (row) => row.thumbnailImages,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='이미지' />
    ),
    cell: ({ row }) => (
      <img
        src={row.original.thumbnailImages[0]?.imageUrl}
        className='max-w-36'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: '자재명',
    accessorKey: 'productName',
    accessorFn: (row) => row.productName,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='자재명' />
    ),
    meta: {
      className: '',
      enableSearch: true,
    },
    cell: ({ row }) => (
      <LongText className='max-w-24'>{row.original.productName}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'price',
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='판매가' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('price')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: '진열상태',
    accessorKey: 'visibleStatus',
    accessorFn: (row) => row.visibleStatus,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='진열' />
    ),
    cell: ({ row }) => {
      const active = row.original.visibleStatus === 'Y'
      const badgeColor = active
        ? 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'
        : 'bg-neutral-300/40 border-neutral-300'

      return (
        <Badge variant='outline' className={cn('capitalize', badgeColor)}>
          <LongText className='max-w-36'>{active ? '진열' : '미진열'}</LongText>
        </Badge>
      )
    },
    meta: {
      enableSearch: true,
      filterOptions: [
        { label: '진열', value: 'Y' },
        { label: '미진열', value: 'N' },
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
    cell: DataTableRowActions<Product>,
  },
]
