"use client";

import SearchResults from "@/components/SearchResults";
import { useFetchMusic } from "@/hooks/useFetchMusic";

export default function Page() {
  const { searchResults, error, isLoading } = useFetchMusic({
    query: "is this desire?",
    page: 1,
  });

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
