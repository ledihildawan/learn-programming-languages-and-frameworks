"use client";

import { CustomLink } from "@/components/custom-link";
import { DataTableCustomizeColumns } from "@/components/data-table/data-table-customize-columns";
import { DataTableColumnHeader } from "@/components/data-table/data-table-header";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTableData } from "@/hooks/use-table-data";
import { eden } from "@/lib/eden";
import { Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, Row, flexRender } from "@tanstack/react-table";
import * as React from "react";
import { z } from "zod";

export const schema = z.object({
  id: z.number(),
  description: z.string(),
  action: z.string(),
  createdAt: z.string(),
  module: z.string(),
  user: z.string(),
});

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

async function getAuditLogsFn({ pagination, sorting }: any) {
  const res = await eden.api["audit-log"].index.get({
    query: {
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      sort: JSON.stringify(sorting),
    },
  });

  return res.data;
}

function useGetAuditLogs({ pagination, sorting }: any) {
  const [data, setData] = React.useState([]);
  const [newPagination, setNewPagination] = React.useState<{
    total: Nullable<number>;
    page: Nullable<number>;
    pageSize: Nullable<number>;
    totalPages: Nullable<number>;
    prevPage: Nullable<number>;
    nextPage: Nullable<number>;
  }>();

  const { isLoading } = useQuery({
    queryKey: ["auditLogs", pagination, sorting],
    queryFn: async () => {
      const res = await getAuditLogsFn({ pagination, sorting });

      setData(res.data);
      setNewPagination(res.pagination);

      return res.data;
    },
  });

  return {
    data: data || [],
    isLoading,
    pagination: newPagination,
  };
}

export function AuditLogTable() {
  const columns: ColumnDef<z.infer<typeof schema>>[] = React.useMemo(
    () => [
      {
        accessorKey: "action",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Action" />
        ),
      },
      {
        accessorKey: "module",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Module" />
        ),
      },
      {
        accessorKey: "user",
        header: "User",
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
          let value = row.original.description;

          if (row.original.description.length > 120) {
            value = `${value.slice(0, 120)}...`;
          }

          return (
            <CustomLink
              href={`/audit-logs/${row.original.id}`}
              className="hover:underline"
            >
              {value}
            </CustomLink>
          );
        },
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
        meta: {
          label: "Created At",
        },
      },
    ],
    [],
  );

  const { table } = useTableData({
    columns,
    useGetData: useGetAuditLogs,
  });

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Activity Logs</span>
        </div>
        <div className="flex items-center gap-2">
          <DataTableCustomizeColumns table={table} />
        </div>
      </div>

      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => <DraggableRow key={row.id} row={row} />)
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <DataTablePagination table={table} hideInfoSelection={true} />
      </div>
    </div>
  );
}
