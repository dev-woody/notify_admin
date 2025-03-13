import { ColumnDef } from '@tanstack/react-table'
import { CampaignResponse } from '@/data/schema/campaignSchema'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/common/table/column-header'
import { DataTableRowActions } from '@/components/common/table/row-actions'
import LongText from '@/components/long-text'

// import { callTypes, userTypes } from '../data/data'

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
}

const businessLabels: Record<string, string> = {
  FAMOUS: '맛집',
  BEAUTY: '뷰티',
  PRODUCT: '제품',
  ETC: '기타',
}

export const columns: ColumnDef<CampaignResponse>[] = [
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
    id: 'business',
    accessorKey: 'business',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='업종' />
    ),
    cell: ({ row }) => {
      const business = row.getValue('business') as string
      return (
        <LongText className='max-w-24'>
          {businessLabels[business] || '알 수 없음'}
        </LongText>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'title',
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='업체명' />
    ),
    meta: {
      className: 'w-60',
    },
    cell: ({ row }) => (
      <LongText className='max-w-60'>{row.getValue('title')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'contactName',
    accessorKey: 'contactName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='대표명' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('contactName')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'contactPhone',
    accessorKey: 'contactPhone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='연락처' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('contactPhone')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'contactEmail',
    accessorKey: 'contactEmail',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='이메일' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('contactEmail')}</LongText>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='상태' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as keyof typeof statusColors

      return (
        <Badge className={cn('px-2 py-1 rounded-md', statusColors[status])}>
          {status === 'PENDING' && '대기 중'}
          {status === 'APPROVED' && '승인됨'}
          {status === 'REJECTED' && '거부됨'}
        </Badge>
      )
    },
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
