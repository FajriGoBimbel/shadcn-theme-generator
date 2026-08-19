import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { flexRender } from "@tanstack/react-table"

interface SkeletonTableProps {
  columnCount?: number
  rowCount?: number
  table?: any
}

export const SkeletonTable = ({ columnCount = 5, rowCount = 5, table }: SkeletonTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted">
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
