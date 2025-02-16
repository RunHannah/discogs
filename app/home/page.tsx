"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchSearch } from "@/app/lib/actions";
import SearchForm from "@/components/FormSearch";
import CardWithImage from "@/components/CardWithImage";
import { FormSchema } from "../lib/formSchema";
import Grid from "@/components/Grid";
import { Result } from "../types/DiscogsResponse";

export default function Page() {
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleOnSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      setIsLoading(true);
      const response = await fetchSearch(values);
      console.log("RESPONSE SUCCESS", response);

      if (response?.results) {
        setSearchResults(response?.results);
      } else {
        setError(true);
      }
    } catch (e) {
      console.log("Fetch Error: ", e);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchForm onSubmit={handleOnSubmit} />
      <Grid>
        {isLoading ? (
          Array.from({ length: 25 }).map((_, index) => (
            <Skeleton key={index} className="h-[250px] w-[250px]" />
          ))
        ) : error ? (
          <p>An error occurred</p>
        ) : (
          searchResults.map((result) => (
            <CardWithImage
              key={result.id}
              title={result.title}
              year={result.year}
              country={result.country}
              alt={result.title}
              src={result.cover_image}
              width={250}
              height={250}
            />
          ))
        )}
      </Grid>
    </>
  );
}
