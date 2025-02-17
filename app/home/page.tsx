"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchSearch } from "@/lib/actions";
import { PAGINATION } from "@/lib/constants";
import SearchForm from "@/components/FormSearch";
import CardWithImage from "@/components/CardWithImage";
import Grid from "@/components/Grid";
import { Result, Pagination } from "../../types/DiscogsResponse";
import PaginationBar from "@/components/PaginationBar";

export type FetchMusicType = {
  artist?: string;
  releaseTitle?: string;
  genre?: string;
  page?: number;
};

export default function Page() {
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState<Pagination>();
  const [artist, setArtist] = useState("");
  const [releaseTitle, setReleaseTitle] = useState("");
  const [genre, setGenre] = useState("");

  const fetchMusic = async ({
    artist,
    releaseTitle,
    genre,
    page,
  }: FetchMusicType) => {
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
        setPagination(response.pagination);
      }

      if (response?.error) {
        setError(response.error);
      }
    } catch (error: unknown) {
      console.log("Fetch Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger the fetch on initial render with default artist
  // useEffect(() => {
  //   fetchMusic({ artist, releaseTitle, genre, page: 1 });
  // }, []);

  const handleOnSubmit = async (values: FetchMusicType) => {
    const { artist, releaseTitle, genre, page } = values;
    fetchMusic({
      artist,
      releaseTitle,
      genre,
      page,
    });

    setArtist(artist || "");
    setReleaseTitle(releaseTitle || "");
    setGenre(genre || "");
  };

  const paginationOnClick = (action: string) => {
    let newPage;

    if (pagination) {
      switch (action) {
        case PAGINATION.PREVIOUS_PAGE:
          newPage = Math.max(pagination.page - 1, 1); // Prevent going below page 1
          break;
        case PAGINATION.NEXT_PAGE:
          newPage = Math.min(pagination.page + 1, pagination.pages); // Prevent going beyond the last page
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

  const renderResults = () => {
    if (isLoading) {
      return (
        <Grid>
          {Array.from({ length: 25 }).map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-[200px]" />
          ))}
        </Grid>
      );
    }

    if (searchResults.length === 0) {
      return <p>Sorry no results were found. Please try again.</p>;
    }

    return (
      <Grid>
        {searchResults.map((result) => (
          <Link key={result.id} href={`/releases/${result.id}`}>
            <CardWithImage
              title={result.title}
              year={result.year}
              country={result.country}
              alt={result.title}
              src={result.cover_image}
              width={200}
              height={200}
            />
          </Link>
        ))}
      </Grid>
    );
  };

  return (
    <>
      {error ? (
        <h1 className="text-center">😞 {error}</h1>
      ) : (
        <div className="flex flex-col items-center content-center">
          <SearchForm onSubmit={handleOnSubmit} />
          {renderPagination()}
          {renderResults()}
        </div>
      )}
    </>
  );
}
