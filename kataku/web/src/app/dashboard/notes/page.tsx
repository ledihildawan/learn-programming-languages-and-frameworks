"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { eden } from "@/lib/eden";
import { authStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

export const schema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
});

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "title",
    header: "Title",
    enableHiding: false,
    cell: ({ row }) => (
      <Link href={`/dashboard/notes/${row.original.slug}`}>
        {row.original.title}
      </Link>
    ),
  },
];

export default function Page() {
  const auth = useStore(authStore);
  const [data, setData] = useState(() => []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await eden.api.note.index.get();

      setData(res.data.data);
    },
  });

  return (
    <div className="grid gap-6 px-4 lg:px-6">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/dashboard/notes/new">Add Note</Link>
        </Button>
      </div>

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
            {table.getRowModel().rows.map((row) => (
              <TableRow>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
