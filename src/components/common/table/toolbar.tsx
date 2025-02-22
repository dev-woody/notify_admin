import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from './faceted-filter'
import { DataTableViewOptions } from './view-options'

export interface FilterOption {
  label: string
  value: string
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const searchableColumns = table
    .getAllColumns()
    .filter((column) => column.columnDef.meta?.enableSearch)

  const filterableColumns = table
    .getAllColumns()
    .filter((column) => column.columnDef.meta?.filterOptions)

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        {searchableColumns.map((column) => (
          <Input
            key={column.id}
            placeholder={`${column.id} 검색`}
            value={(column.getFilterValue() as string) ?? ''}
            onChange={(event) => column.setFilterValue(event.target.value)}
            className='h-8 w-[150px] lg:w-[250px]'
          />
        ))}

        <div className='flex gap-x-2'>
          {filterableColumns.map((column) => (
            <DataTableFacetedFilter
              key={column.id}
              column={column}
              title={column.id}
              options={column.columnDef.meta?.filterOptions || []}
            />
          ))}
        </div>

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            지우기
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>

      <DataTableViewOptions table={table} />
    </div>
  )
}
