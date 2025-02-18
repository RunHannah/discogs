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
    <div className="max-w-[1100px] m-auto pt-5">
      {isLoading ? (
        <Grid>
          {Array.from({ length: 25 }).map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-[200px]" />
          ))}
        </Grid>
      ) : (
        <Grid>
          {searchResults.map((result) => {
            const imageSrc = result.cover_image.endsWith('gif') ? "https://placehold.co/200x200.png" : result.cover_image
            return (
              <Link
                className="w-fit h-fit"
                key={result.id}
                href={`/releases/${result.id}`}
              >
                <CardWithImage
                  title={result.title}
                  year={result.year}
                  country={result.country}
                  alt={result.title}
                  src={imageSrc}
                  width={200}
                  height={200}
                />
              </Link>
            );
          })}
        </Grid>
      )}
    </div>
  );
}
