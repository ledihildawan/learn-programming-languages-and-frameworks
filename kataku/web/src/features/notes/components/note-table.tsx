"use client";

import { CustomLink } from "@/components/custom-link";
import { queryClient } from "@/components/query-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { env } from "@/env/client";
import { eden } from "@/lib/eden";
import { deleteRecent } from "@/store/recent-store";
import { Nullable } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ColumnsIcon,
  MoreVerticalIcon,
  PlusIcon,
} from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
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

async function getNotesFn({ pagination }: any) {
  const res = await eden.api.note.index.get({
    query: {
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    },
  });

  return res.data;
}

function useGetNotes({ pagination }: any) {
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
    queryKey: ["notes", pagination],
    queryFn: async () => {
      const res = await getNotesFn({ pagination });

      setData(res.data);
      setNewPagination(res.pagination);

      return res.data;
    },
  });

  return {
    data: data || [],
    isLoading,
    newPagination,
  };
}

export function NoteTable() {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ history: "push" }),
  );
  const [perPage, setPerPage] = useQueryState(
    "perPage",
    parseAsInteger.withDefault(10).withOptions({ history: "push" }),
  );
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
        header: "Title",
        cell: ({ row }) => (
          <CustomLink
            href={`/dashboard/notes/${row.original.slug}`}
            className="hover:underline"
          >
            {row.original.title}
          </CustomLink>
        ),
        enableHiding: false,
      },
      {
        accessorKey: "slug",
        header: "Slug",
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
        header: "Created At",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(),
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
                  href={`${env.NEXT_PUBLIC_WEB_URL}/dashboard/notes/${row.original.slug}/edit`}
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

  const pagination = React.useMemo(
    () => ({
      pageSize: perPage,
      pageIndex: page - 1,
    }),
    [page, perPage],
  );

  const { data, newPagination } = useGetNotes({ pagination });

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    rowCount: newPagination?.total as number | undefined,
    getCoreRowModel: getCoreRowModel(),
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
        <div className="flex items-center justify-end px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ColumnsIcon />
                  <span className="hidden lg:inline">Customize Columns</span>
                  <span className="lg:hidden">Columns</span>
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide(),
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.columnDef.header as string}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              <PlusIcon />
              <CustomLink
                href="/dashboard/notes/new"
                className="hidden lg:inline"
              >
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

          <div className="flex items-center justify-between px-4">
            <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <div className="hidden items-center gap-2 lg:flex">
                <Label htmlFor="rows-per-page" className="text-sm font-medium">
                  Rows per page
                </Label>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => setPerPage(Number(value))}
                >
                  <SelectTrigger className="w-20" id="rows-per-page">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => setPage(1)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => setPage((value) => value - 1)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => setPage((value) => value + 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon />
                </Button>
                <Button
                  variant="outline"
                  className="hidden size-8 lg:flex"
                  size="icon"
                  onClick={() => setPage(newPagination?.totalPages!)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRightIcon />
                </Button>
              </div>
            </div>
          </div>
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
