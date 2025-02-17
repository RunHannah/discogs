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
      <h2>Title: {title}</h2>
      <h3>Released: {year}</h3>
      <p>Country: {country}</p>
      <p>Labels: {labels[0]?.name}</p>
      <p>Genres: {genres.join(", ")}</p>
      <p>Artists: {artists.map((artist) => artist.name).join(", ")}</p>
    </div>
  );
}
