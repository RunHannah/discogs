"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchSearch } from "@/lib/actions";
import { PAGINATION } from "@/lib/constants";
import PaginationBar from "@/components/PaginationBar";
import SearchResults from "@/components/SearchResults";
import { Result, Pagination } from "@/types/DiscogsResponse";
import { SearchType } from "@/types/Search";

export default function Search() {
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [pagination, setPagination] = useState<Pagination>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const artist = searchParams.get("artist") || "";
  const releaseTitle = searchParams.get("releaseTitle") || "";
  const genre = searchParams.get("genre") || "";
  const page = Number(searchParams.get("page")) || 1;

  const fetchMusic = async ({
    artist,
    releaseTitle,
    genre,
    page,
  }: SearchType) => {
    try {
      setIsLoading(true);
      const response = await fetchSearch({
        artist,
        releaseTitle,
        genre,
        page,
      });

      if (response?.results?.length === 0) {
        setNoResultsFound(true);
      }

      if (response.results && response?.results.length > 0) {
        setSearchResults(response.results);
        setPagination(response.pagination);
      }

      if (response?.error) {
        setError(response.error);
      }
    } catch (error: unknown) {
      console.error("Fetch Error: ", error);
      setError("Sorry, an error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMusic({ artist, releaseTitle, genre, page });
  }, [artist, releaseTitle, genre, page]);

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
    fetchMusic({ artist, releaseTitle, genre, page: newPage });
  };

  const renderPagination = () => {
    // show skeleton on initial search, not when paginating
    if (isLoading && searchResults.length === 0) {
      return <Skeleton className="h-[36px] w-[300px]" />;
    }

    if (pagination && pagination.pages > 1) {
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
    <div className="flex flex-col items-center content-center">
      {error && <p className="text-center">😞 {error}</p>}
      {renderPagination()}
      {noResultsFound ? (
        <p>Sorry no results were found. Please try again.</p>
      ) : (
        <SearchResults isLoading={isLoading} searchResults={searchResults} />
      )}
    </div>
  );
}
