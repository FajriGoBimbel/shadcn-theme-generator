"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react"
import { DataTablePagination } from "./data-table-pagination"
import { SkeletonTable } from "./skeleton-table"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

type ExtendedColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
  sortable?: boolean
}

interface DataTableProps<TData, TValue> {
  columns: ExtendedColumnDef<TData, TValue>[]
  data: TData[]
  pagination?: {
    pageSizeOptions?: number[]
    initialPageSize?: number
    initialPageIndex?: number
    onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void
    totalData?: number
  }
  loading?: boolean
  onSortingChange?: (sorting: SortingState) => void
  isSequenceNumber?: boolean
  isSelect?: boolean
  onSelect?: (selected: TData[]) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  loading,
  onSortingChange,
  isSequenceNumber = true,
  isSelect = false,
  onSelect,
}: DataTableProps<TData, TValue>) {
  const calculatedPageCount =
    pagination?.totalData !== undefined && pagination.initialPageSize !== undefined
      ? Math.ceil(pagination.totalData / pagination.initialPageSize)
      : undefined

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [isRender, setIsRender] = React.useState(false)
  const [trigerCheck, setTrigerCheck] = React.useState<TData[]>()

  const [paginationState, setPaginationState] = React.useState(
    pagination
      ? {
          pageIndex: pagination.initialPageIndex ? pagination.initialPageIndex - 1 : 0,
          pageSize: pagination.initialPageSize ?? 10,
        }
      : undefined
  )

  const table = useReactTable({
    data: data ?? [],
    columns: [],
    manualPagination: calculatedPageCount !== undefined,
    manualSorting: !!onSortingChange,
    enableMultiSort: false,
    pageCount: calculatedPageCount,
    initialState: {
      pagination: pagination
        ? {
            pageIndex: pagination.initialPageIndex ? pagination.initialPageIndex - 1 : 0,
            pageSize: pagination.initialPageSize ?? 10,
          }
        : undefined,
    },
    state: {
      pagination: paginationState,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    onPaginationChange: pagination
      ? (updater) => {
          setPaginationState((prev: any) => {
            const next = typeof updater === "function" ? updater(prev) : updater

            if (next.pageIndex === prev?.pageIndex && next.pageSize === prev.pageSize) {
              return prev
            }

            pagination.onPaginationChange?.({
              pageIndex: next.pageIndex + 1,
              pageSize: next.pageSize,
            })

            return next
          })
        }
      : undefined,
    onSortingChange: (updater) => {
      const newSorting = typeof updater === "function" ? updater(sorting) : updater
      setSorting(newSorting)
      onSortingChange?.(newSorting)
    },
    getSortedRowModel: getSortedRowModel(),
  })

  React.useEffect(() => {
    if (!pagination) return

    setPaginationState({
      pageIndex: pagination.initialPageIndex ? pagination.initialPageIndex - 1 : 0,
      pageSize: pagination.initialPageSize ?? 10,
    })
  }, [pagination?.initialPageIndex, pagination?.initialPageSize])

  const modifiedColumns = React.useMemo(() => {
    return [
      ...(isSelect
        ? [
            {
              id: "select",
              header: () => null,
              cell: ({ row }: any) => (
                <Checkbox
                  checked={row.getIsSelected()}
                  onCheckedChange={(value) => {
                    row.toggleSelected(!!value)
                    const selected = table.getSelectedRowModel().rows.map((row) => row.original)
                    setTrigerCheck(selected)
                    onSelect?.(selected)
                  }}
                  aria-label="Select row"
                  className="mr-2"
                />
              ),
              enableSorting: false,
              enableHiding: false,
            },
          ]
        : []),
      ...(isSequenceNumber
        ? [
            {
              header: "No",
              accessorKey: "no",
              cell: ({ row }: any) => {
                const pageIndex = paginationState?.pageIndex ?? 0
                const pageSize = paginationState?.pageSize ?? 10
                const index = row.index + pageIndex * pageSize + 1
                return <>{index}</>
              },
              enableSorting: false,
            },
          ]
        : []),
      ...columns.map((col: any) => ({
        ...col,
        columns: Array.isArray(col.columns)
          ? col.columns.map((child: any) => ({
              ...child,
              enableSorting: child.sortable ?? false,
            }))
          : undefined,
        enableSorting: col.sortable ?? false,
      })),
    ]
  }, [table, columns, isSelect, isSequenceNumber, paginationState])

  table.setOptions((prev) => ({
    ...prev,
    columns: modifiedColumns,
  }))

  React.useEffect(() => {
    setIsRender(true)
    if (!isSelect || !isRender || !table.getRowModel().rows?.length) return

    const selectedRows = table?.getSelectedRowModel()?.rows?.map((row) => row?.original) ?? []
    onSelect?.(selectedRows)
  }, [table, isSelect, trigerCheck, onSelect])

  if (loading)
    return <SkeletonTable table={table} columnCount={modifiedColumns.length} rowCount={12} />

  const indexEnd = table.getHeaderGroups().length - 1

  return (
    <div className="rounded-md border">
      <Table className="border-collapse">
        <TableHeader className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header?.colSpan}
                  className={
                    header.id === "select" && isSelect
                      ? "bg-muted sticky left-0 z-10"
                      : "border-border border-r last:border-r-0"
                  }
                >
                  {header.id === "select" && isSelect && data !== undefined ? (
                    <Checkbox
                      checked={
                        table.getIsAllPageRowsSelected()
                          ? true
                          : table.getIsSomePageRowsSelected()
                            ? "indeterminate"
                            : false
                      }
                      onCheckedChange={(value) => {
                        table.toggleAllPageRowsSelected(!!value)
                        const selected = table.getSelectedRowModel().rows.map((row) => row.original)
                        setTrigerCheck(selected)
                        onSelect?.(selected)
                      }}
                      className="mr-2"
                      aria-label="Select all"
                    />
                  ) : header.isPlaceholder ? null : (
                    <div
                      className={`flex cursor-pointer items-center ${
                        headerGroup.depth === indexEnd ? "" : "justify-center"
                      }`}
                      onClick={() => {
                        if (!header.column.getCanSort()) return

                        const isAsc = header.column.getIsSorted() === "asc"
                        const newSorting = [{ id: header.id, desc: isAsc }]
                        setSorting(newSorting)
                        onSortingChange?.(newSorting)
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}

                      {header.column.getCanSort() && (
                        <>
                          {header.column.getIsSorted() === "asc" && (
                            <ArrowUp className="ml-2 h-4 w-4 text-gray-500" />
                          )}
                          {header.column.getIsSorted() === "desc" && (
                            <ArrowDown className="ml-2 h-4 w-4 text-gray-500" />
                          )}
                          {!header.column.getIsSorted() && (
                            <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                          )}
                        </>
                      )}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table?.getRowModel().rows?.length ? (
            table?.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={
                      cell.column.id === "select"
                        ? "sticky left-0 z-10 w-24 bg-white"
                        : "border-border border-r last:border-r-0"
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={modifiedColumns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {table?.getRowModel().rows?.length > 0 && pagination && (
        <DataTablePagination
          table={table}
          pageSizeOptions={pagination.pageSizeOptions ?? [10, 20, 30, 40, 50]}
          total_data={pagination?.totalData}
        />
      )}
    </div>
  )
}
