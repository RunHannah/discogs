import { Release } from "@/types/DiscogsRelease";

type ReleaseDetailsType = Pick<
  Release,
  "title" | "year" | "country" | "labels" | "genres" | "artists"
>;

export default function ReleaseDetails({
    title,
    year,
    country,
    labels,
    genres,
    artists,
}: ReleaseDetailsType) {
  return (
    <div>
      <h2>Title: {title || "Unknown"}</h2>
      <h3>Released: {year || "Unknown"}</h3>
      <p>Country: {country || "Unknown"}</p>
      <p>Labels: {labels[0]?.name || "Unknown"}</p>
      <p>Genres: {genres.join(", ") || "Unknown"}</p>
      <p>Artists: {artists.map((artist) => artist.name).join(", ") || "Unknown"}</p>
    </div>
  );
}
