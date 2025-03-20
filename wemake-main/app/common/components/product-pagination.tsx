import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "~/common/components/ui/pagination";
import { useSearchParams } from "react-router";
type ProductPaginationProps = {
  totalPages: number;
};

export function ProductPagination({ totalPages }: ProductPaginationProps) {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const getUrlPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `?${params}`;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {page === 1 ? null : (
            <>
              <PaginationItem>
                <PaginationPrevious to={getUrlPage(page - 1)} />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink to={getUrlPage(page - 1)}>
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationLink to={getUrlPage(page)} isActive>
              {page}
            </PaginationLink>
          </PaginationItem>
          {page === totalPages ? null : (
            <>
              <PaginationItem>
                <PaginationLink to={getUrlPage(page + 1)}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
              {page + 1 === totalPages ? null : (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext to={getUrlPage(page + 1)} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
