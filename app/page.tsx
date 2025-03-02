"use client";

import { useState, useEffect } from "react";
import { fetchSearch } from "@/lib/actions";
import SearchResults from "@/components/SearchResults";
import { Result } from "@/types/DiscogsResponse";
import { SearchType } from "@/types/Search";

export default function Page() {
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMusic = async ({ query, page }: SearchType) => {
    try {
      setIsLoading(true);
      const response = await fetchSearch({
        query,
        page,
      });

      if (response?.results) {
        setSearchResults(response.results);
      }

      if (response?.error) {
        setError(response.error);
      }
    } catch (error: unknown) {
      console.log("Fetch Error: ", error);
      setError("Sorry, an error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger the fetch on initial render with default query
  useEffect(() => {
    fetchMusic({
      query: "is this desire",
      page: 1,
    });
  }, []);

  return (
    <>
      {error ? (
        <p className="text-center mt-20">😞 {error}</p>
      ) : (
        <SearchResults isLoading={isLoading} searchResults={searchResults} />
      )}
    </>
  );
}
