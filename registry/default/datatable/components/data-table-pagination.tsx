"use client"

import { Table } from "@tanstack/react-table"
import BasicPagination from "@/components/datatable/basic-pagination"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  showSelected?: boolean
  pageSizeOptions?: number[]
  total_data?: number
}

export function DataTablePagination<TData>({
  table,
  showSelected = true,
  pageSizeOptions = [10, 20, 30, 40, 50],
  total_data,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const currentRows = table.getFilteredRowModel().rows.length

  const startRecord = pageIndex * pageSize + 1
  const endRecord = pageIndex * pageSize + currentRows

  return (
    <div className="flex items-center justify-between px-4 py-3">
      {showSelected && (
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          Record {startRecord} - {endRecord} of {total_data}
        </div>
      )}
      <div className="hidden items-center gap-2 lg:flex">
        <label htmlFor="rows-per-page" className="text-sm font-medium">
          Rows per page
        </label>
        <select
          id="rows-per-page"
          className="h-8 w-20 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          value={`${table.getState().pagination.pageSize}`}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={`${size}`}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full items-center gap-8 lg:ml-4 lg:w-fit">
        <BasicPagination
          totalPages={total_data ? Math.ceil(total_data / table.getState().pagination.pageSize) : 0}
          initialPage={table.getState().pagination.pageIndex + 1}
          onPageChange={(page) => {
            table.setPageIndex(page - 1)
          }}
        />
      </div>
    </div>
  )
}
