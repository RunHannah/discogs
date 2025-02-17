"use client";

import { useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchSearch } from "@/app/lib/actions";
import SearchForm from "@/components/FormSearch";
import CardWithImage from "@/components/CardWithImage";
import Grid from "@/components/Grid";
import { Result, Pagination } from "../types/DiscogsResponse";
import PaginationBar from "@/components/PaginationBar";
import { PAGINATION } from "../lib/constants";

export type FetchMusicType = {
  artist?: string;
  releaseTitle?: string;
  genre?: string;
  page?: number;
};

export default function Page() {
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
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
        release_title: releaseTitle,
        genre,
        page,
      });
      console.log("RESPONSE SUCCESS", response);

      if (response?.results) {
        setSearchResults(response.results);
        setPagination(response.pagination);
      }
    } catch (e) {
      console.log("Fetch Error: ", e);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSubmit = async (values: FetchMusicType) => {
    if (values) {
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
    }
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
            <Skeleton key={index} className="h-[250px] w-[250px]" />
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
              width={250}
              height={250}
            />
          </Link>
        ))}
      </Grid>
    );
  };

  return (
    <div className="flex flex-col items-center content-center">
      <SearchForm onSubmit={handleOnSubmit} />
      {renderPagination()}
      {renderResults()}
    </div>
  );
}
