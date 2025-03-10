import { motion } from "motion/react";
import Link from "next/link";
import Grid from "@/components/Grid";
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
  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  return (
    <div className="max-w-[1100px] m-auto pt-5">
      <Grid isLoading={isLoading}>
        {searchResults.map((result) => {
          const imageSrc = result.cover_image.endsWith("gif")
            ? "https://placehold.co/200x200.png"
            : result.cover_image;

          return (
            <motion.div key={result.id} variants={itemVariants}>
              <Link className="w-fit h-fit" href={`/releases/${result.id}`}>
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
            </motion.div>
          );
        })}
      </Grid>
    </div>
  );
}
