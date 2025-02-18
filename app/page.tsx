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

  // Trigger the fetch on initial render with default artist
  useEffect(() => {
    fetchMusic({
      artist: "Aqua",
      releaseTitle: "Aquarium",
      genre: "pop",
      page: 1,
    });
  }, []);

  return (
    <>
      {error ? (
        <h1 className="text-center">😞 {error}</h1>
      ) : (
        <SearchResults isLoading={isLoading} searchResults={searchResults} />
      )}
    </>
  );
}
