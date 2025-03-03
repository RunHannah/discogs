"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGINATION } from "@/lib/constants";
import Loading from "@/app/loading";
import PaginationBar from "@/components/PaginationBar";
import SearchResults from "@/components/SearchResults";
import { useFetchMusic } from "@/hooks/useFetchMusic";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("page")) || 1;
  const {
    searchResults,
    noResultsFound,
    pagination,
    error,
    isLoading,
    fetchMusic,
  } = useFetchMusic({ query, page });

  const paginationOnClick = (action: string) => {
    let newPage;
    if (pagination) {
      switch (action) {
        case PAGINATION.PREVIOUS_PAGE:
          newPage = Math.max(pagination.page - 1, 1);
          break;
        case PAGINATION.NEXT_PAGE:
          newPage = Math.min(pagination.page + 1, pagination.pages);
          break;
        case PAGINATION.LAST_PAGE:
          newPage = pagination.pages;
          break;
        default:
          return;
      }
    }
    fetchMusic({ query, page: newPage });
  };

  const renderPagination = () => {
    // show skeleton on initial search, not when paginating
    if (isLoading && searchResults.length === 0) {
      return <Skeleton className="h-[36px] w-[300px] m-auto mt-1" />;
    }

    if (!noResultsFound && pagination && pagination.pages > 1) {
      return (
        <PaginationBar
          currentPage={pagination.page}
          totalPages={pagination.pages}
          handlePagination={paginationOnClick}
        />
      );
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      {error && <p className="text-center mt-20">😞 {error}</p>}
      {renderPagination()}
      {noResultsFound ? (
        <p className="text-center mt-20">
          Sorry no results were found. Please try again.
        </p>
      ) : (
        <SearchResults isLoading={isLoading} searchResults={searchResults} />
      )}
    </Suspense>
  );
}
