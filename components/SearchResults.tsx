import Link from "next/link";
import Grid from "@/components/Grid";
import { Skeleton } from "@/components/ui/skeleton";
import CardWithImage from "@/components/CardWithImage";
import { Result } from "@/types/DiscogsResponse";

interface SearchResultsProps {
  isLoading: boolean;
  searchResults: Result[];
}

export default function SearchResults({
  isLoading,
  searchResults,
}: SearchResultsProps) {
  return (
    <>
      {isLoading ? (
        <Grid>
          {Array.from({ length: 25 }).map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-[200px]" />
          ))}
        </Grid>
      ) : (
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
      )}
    </>
  );
}
