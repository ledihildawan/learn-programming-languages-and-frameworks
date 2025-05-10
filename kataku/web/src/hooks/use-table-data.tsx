import { getSortingStateParser } from "@/lib/parser";
import {
  getCoreRowModel,
  type PaginationState,
  SortingState,
  type Updater,
  useReactTable,
} from "@tanstack/react-table";
import { parseAsInteger, useQueryState, UseQueryStateOptions } from "nuqs";
import React, { useMemo } from "react";

const PAGE_KEY = "page";
const PER_PAGE_KEY = "perPage";
const SORT_KEY = "sort";
const ARRAY_SEPARATOR = ",";
const DEBOUNCE_MS = 300;
const THROTTLE_MS = 50;

export function useTableData(props: any) {
  const {
    columns,
    pageCount = -1,
    initialState,
    history = "replace",
    debounceMs = DEBOUNCE_MS,
    throttleMs = THROTTLE_MS,
    clearOnDefault = false,
    enableAdvancedFilter = false,
    scroll = false,
    shallow = true,
    startTransition,
    ...tableProps
  } = props;

  const queryStateOptions = React.useMemo<
    Omit<UseQueryStateOptions<string>, "parse">
  >(
    () => ({
      history,
      scroll,
      shallow,
      throttleMs,
      debounceMs,
      clearOnDefault,
      startTransition,
    }),
    [
      history,
      scroll,
      shallow,
      throttleMs,
      debounceMs,
      clearOnDefault,
      startTransition,
    ],
  );

  const [page, setPage] = useQueryState(
    PAGE_KEY,
    parseAsInteger.withDefault(1).withOptions({ history: "push" }),
  );
  const [perPage, setPerPage] = useQueryState(
    PER_PAGE_KEY,
    parseAsInteger.withDefault(10).withOptions({ history: "push" }),
  );

  const pagination: PaginationState = useMemo(
    () => ({
      pageSize: perPage,
      pageIndex: page - 1,
    }),
    [page, perPage],
  );

  const columnIds = useMemo(() => {
    return new Set(
      columns.map((column) => column.id).filter(Boolean) as string[],
    );
  }, [columns]);

  const [sorting, setSorting] = useQueryState(
    SORT_KEY,
    getSortingStateParser<any>(columnIds)
      .withOptions(queryStateOptions)
      .withDefault(initialState?.sorting ?? []),
  );

  const onSortingChange = React.useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      if (typeof updaterOrValue === "function") {
        const newSorting = updaterOrValue(sorting);
        setSorting(newSorting);
      } else {
        setSorting(updaterOrValue);
      }
    },
    [sorting, setSorting],
  );

  const onPaginationChange = React.useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      if (typeof updaterOrValue === "function") {
        const newPagination = updaterOrValue(pagination);

        void setPage(newPagination.pageIndex + 1);
        void setPerPage(newPagination.pageSize);
      } else {
        void setPage(updaterOrValue.pageIndex + 1);
        void setPerPage(updaterOrValue.pageSize);
      }
    },
    [pagination, setPage, setPerPage],
  );

  const query = props.useGetData({ pagination, sorting });

  const table = useReactTable({
    data: query?.data || [],
    columns: props.columns,
    state: {
      sorting,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange,
    onSortingChange,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: query?.pagination?.totalPages,
  });

  return {
    table,
    pagination,
  };
}
