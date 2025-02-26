import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PAGINATION } from "@/lib/constants";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  handlePagination: (action: string) => void;
}

export default function PaginationBar({
  currentPage,
  totalPages,
  handlePagination,
}: PaginationBarProps) {
  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }
            onClick={() => handlePagination(PAGINATION.PREVIOUS_PAGE)}
          />
        </PaginationItem>

        {/* Current Page */}
        <PaginationItem className="cursor-not-allowed opacity-50">
          {currentPage}
        </PaginationItem>

        {/* Ellipsis */}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        {/* Last Page */}
        <PaginationItem>
          <PaginationLink
            className={
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }
            onClick={() => handlePagination(PAGINATION.LAST_PAGE)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            className={
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }
            onClick={() => handlePagination(PAGINATION.NEXT_PAGE)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
