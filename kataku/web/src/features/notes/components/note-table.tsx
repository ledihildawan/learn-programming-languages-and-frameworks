"use client";

import { CustomLink } from "@/components/custom-link";
import { DataTableCustomizeColumns } from "@/components/data-table/data-table-customize-columns";
import { DataTableColumnHeader } from "@/components/data-table/data-table-header";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { queryClient } from "@/components/query-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { env } from "@/env/client";
import { useTableData } from "@/hooks/use-table-data";
import { eden } from "@/lib/eden";
import { deleteRecent } from "@/store/recent-store";
import { Nullable } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef, flexRender, Row } from "@tanstack/react-table";
import { MoreVerticalIcon, PlusIcon } from "lucide-react";
import * as React from "react";
import removeMd from "remove-markdown";
import { toast } from "sonner";
import { z } from "zod";
import { DeleteDialog, DeleteDialogClickEvent } from "./delete-dialog";

export const schema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  author: z.string(),
});

async function getNotesFn({ pagination, sorting }: any) {
  const res = await eden.api.note.index.get({
    query: {
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      sort: JSON.stringify(sorting),
    },
  });

  return res.data;
}

function useGetNotes({ pagination, sorting }) {
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
    queryKey: ["notes", pagination, sorting],
    queryFn: async () => {
      const res = await getNotesFn({
        pagination,
        sorting,
      });

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

export function NoteTable() {
  const [deletedNote, setDeletedNote] =
    React.useState<Nullable<z.infer<typeof schema>>>();
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const deleteNoteMutation = useMutation({
    mutationFn: async () => {
      try {
        await eden.api.note({ slug: deletedNote!.slug }).delete();
      } catch (error) {}
    },
    onSuccess: async () => {
      setOpenDeleteDialog(false);

      deleteRecent(deletedNote!.slug);

      toast.success("Note has been successfully deleted!");

      queryClient.refetchQueries({ queryKey: ["notes", pagination] });
    },
    onError: () => {
      toast.error("Oops, something went wrong on the server's end!");
    },
  });

  const columns: ColumnDef<z.infer<typeof schema>>[] = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Title" />
        ),
        headerTitle: "Title",
        cell: ({ row }) => (
          <CustomLink
            href={`/notes/${row.original.slug}`}
            className="hover:underline"
          >
            {row.original.title}
          </CustomLink>
        ),
        enableHiding: false,
      },
      {
        accessorKey: "slug",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Slug" />
        ),
        cell: ({ row }) => {
          let value = removeMd(row.original.slug);

          if (row.original.slug.length > 47) {
            value = `${removeMd(row.original.slug.slice(0, 47))}...`;
          }

          return value;
        },
      },
      {
        accessorKey: "content",
        header: "Content",
        cell: ({ row }) => {
          let value = removeMd(row.original.content);

          if (row.original.content.length > 72) {
            value = `${removeMd(row.original.content.slice(0, 72))}...`;
          }

          return value;
        },
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
      {
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Updated At" />
        ),
        cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(),
        meta: {
          label: "Updated At",
        },
      },
      {
        accessorKey: "author",
        header: "Author",
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-muted-foreground data-[state=open]:bg-muted flex size-8"
                size="icon"
              >
                <MoreVerticalIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem>
                <CustomLink
                  href={`${env.NEXT_PUBLIC_WEB_URL}/notes/${row.original.slug}/edit`}
                >
                  Edit
                </CustomLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setDeletedNote(row.original);
                  setOpenDeleteDialog(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [],
  );

  const { table } = useTableData({
    columns,
    useGetData: useGetNotes,
  });

  const handleDeleteDialog = React.useCallback(
    (event: DeleteDialogClickEvent) => {
      if (event === "cancel") {
        setOpenDeleteDialog(false);
      } else {
        deleteNoteMutation.mutate();
      }
    },
    [deletedNote],
  );

  return (
    <>
      <div className="grid gap-4">
        <div className="flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Notes</span>
          </div>
          <div className="flex items-center gap-2">
            <DataTableCustomizeColumns table={table} />
            <Button variant="outline" size="sm">
              <PlusIcon />
              <CustomLink href="/notes/new" className="hidden lg:inline">
                Add Note
              </CustomLink>
            </Button>
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

          <DataTablePagination table={table} />
        </div>
      </div>

      <DeleteDialog
        open={openDeleteDialog}
        onClick={handleDeleteDialog}
        isPending={deleteNoteMutation.isPending}
      />
    </>
  );
}
