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
import { ArrowDown, ArrowUp, ArrowUpDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

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
              cell: ({ row }: any) => {
                const isSelected = row.getIsSelected()
                return (
                  <div className="flex items-center justify-center">
                    <div
                      className={cn(
                        "relative flex h-[18px] w-[18px] shrink-0 cursor-pointer items-center justify-center rounded-[5px] border-2 transition-all duration-200",
                        isSelected
                          ? "border-primary bg-primary shadow-sm shadow-primary/25"
                          : "border-muted-foreground/30 bg-background hover:border-primary/60 hover:bg-primary/5"
                      )}
                      onClick={() => {
                        row.toggleSelected(!isSelected)
                        const selected = table.getSelectedRowModel().rows.map((r) => r.original)
                        setTrigerCheck(selected)
                        onSelect?.(selected)
                      }}
                      role="checkbox"
                      aria-checked={isSelected}
                      aria-label="Select row"
                    >
                      <svg
                        className={cn(
                          "h-3 w-3 text-primary-foreground transition-all duration-200",
                          isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )
              },
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
                return (
                  <span className="text-xs font-medium text-muted-foreground tabular-nums">
                    {index}
                  </span>
                )
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
  const selectedCount = table.getSelectedRowModel().rows.length
  const isAllSelected = table.getIsAllPageRowsSelected()
  const isSomeSelected = table.getIsSomePageRowsSelected()

  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
      {/* Selection indicator bar */}
      {isSelect && selectedCount > 0 && (
        <div className="flex items-center justify-between border-b bg-primary/5 px-4 py-2 transition-all duration-200">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-primary">
              <svg onClick={() => {
              table.toggleAllPageRowsSelected(false)
              setTrigerCheck([])
              onSelect?.([])
            }} className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-medium text-primary">
              {selectedCount} row{selectedCount > 1 ? "s" : ""} selected
            </span>
          </div>
          <button
            onClick={() => {
              table.toggleAllPageRowsSelected(false)
              setTrigerCheck([])
              onSelect?.([])
            }}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear selection
          </button>
        </div>
      )}

      <Table className="border-collapse">
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-border/60">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header?.colSpan}
                  className={cn(
                    "h-11",
                    header.id === "select" && isSelect
                      ? "w-[52px] bg-muted/50 sticky left-0 z-10"
                      : "border-border/40 border-r last:border-r-0"
                  )}
                >
                  {header.id === "select" && isSelect && data !== undefined ? (
                    <div className="flex items-center justify-center">
                      <div
                        className={cn(
                          "relative flex h-[18px] w-[18px] shrink-0 cursor-pointer items-center justify-center rounded-[5px] border-2 transition-all duration-200",
                          isAllSelected
                            ? "border-primary bg-primary shadow-sm shadow-primary/25"
                            : isSomeSelected
                              ? "border-primary bg-primary/10"
                              : "border-muted-foreground/30 bg-background hover:border-primary/60"
                        )}
                        onClick={() => {
                          table.toggleAllPageRowsSelected(!isAllSelected)
                          const selected = table.getSelectedRowModel().rows.map((row) => row.original)
                          setTrigerCheck(selected)
                          onSelect?.(selected)
                        }}
                        role="checkbox"
                        aria-checked={isAllSelected ? true : isSomeSelected ? "mixed" : false}
                        aria-label="Select all"
                      >
                        {isAllSelected ? (
                          <svg
                            className="h-3 w-3 text-primary-foreground transition-all duration-200 scale-100 opacity-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : isSomeSelected ? (
                          <Minus className="h-3 w-3 text-primary transition-all duration-200" />
                        ) : null}
                      </div>
                    </div>
                  ) : header.isPlaceholder ? null : (
                    <div
                      className={cn(
                        "flex items-center gap-1 select-none",
                        header.column.getCanSort() && "cursor-pointer hover:text-foreground transition-colors",
                        headerGroup.depth === indexEnd ? "" : "justify-center"
                      )}
                      onClick={() => {
                        if (!header.column.getCanSort()) return

                        const isAsc = header.column.getIsSorted() === "asc"
                        const newSorting = [{ id: header.id, desc: isAsc }]
                        setSorting(newSorting)
                        onSortingChange?.(newSorting)
                      }}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </span>

                      {header.column.getCanSort() && (
                        <span className="ml-1">
                          {header.column.getIsSorted() === "asc" && (
                            <ArrowUp className="h-3.5 w-3.5 text-primary" />
                          )}
                          {header.column.getIsSorted() === "desc" && (
                            <ArrowDown className="h-3.5 w-3.5 text-primary" />
                          )}
                          {!header.column.getIsSorted() && (
                            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />
                          )}
                        </span>
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
            table?.getRowModel().rows.map((row) => {
              const isSelected = row.getIsSelected()
              return (
                <TableRow
                  key={row.id}
                  data-state={isSelected && "selected"}
                  className={cn(
                    "transition-colors duration-150",
                    isSelected && "bg-primary/[0.03] hover:bg-primary/[0.06]"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell.column.id === "select"
                          ? "sticky left-0 z-10 w-[52px] bg-inherit"
                          : "border-border/40 border-r last:border-r-0"
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={modifiedColumns.length} className="h-32 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">No results found</p>
                  <p className="text-xs text-muted-foreground/60">Try adjusting your filters</p>
                </div>
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
