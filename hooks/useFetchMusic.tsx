import { useState, useEffect } from "react";
import { SearchType } from "@/types/Search";
import { Result, Pagination } from "@/types/DiscogsResponse";
import { fetchSearch } from "@/lib/actions";

export const useFetchMusic = ({ query, page }: SearchType) => {
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [pagination, setPagination] = useState<Pagination>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMusic = async ({ query, page }: SearchType) => {
    try {
      setIsLoading(true);
      const response = await fetchSearch({
        query,
        page,
      });

      if (response?.error) {
        setError(response.error);
      }

      if (response?.results?.length === 0) {
        setNoResultsFound(true);
      }

      if (response.results && response?.results.length > 0) {
        setSearchResults(response.results);
        setPagination(response.pagination);
      }
    } catch (error: unknown) {
      console.error("Fetch Error: ", error);
      setError("Sorry, an error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMusic({ query, page });
  }, [query, page]);

  return {
    searchResults,
    noResultsFound,
    pagination,
    error,
    isLoading,
    fetchMusic,
  };
};
