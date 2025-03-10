import { Release } from "@/types/DiscogsRelease";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

type ReleaseDetailsType = Pick<
  Release,
  "id" | "title" | "year" | "country" | "labels" | "genres" | "artists"
>;

export default function ReleaseDetails({
  id,
  title,
  year,
  country,
  labels,
  genres,
  artists,
}: ReleaseDetailsType) {
  return (
    <div className="flex flex-col ml-7">
      <h1 className="font-bold">{title}</h1>
      <Table className="max-w-4xl mx-auto">
        <TableBody>
          <TableRow className="border-none">
            <TableHead className="p-0 h-0">Released:</TableHead>
            <TableCell className="p-0">{year || "Unknown"}</TableCell>
          </TableRow>
          <TableRow className="border-none">
            <TableHead className="p-0 h-0">Country:</TableHead>
            <TableCell className="p-0">{country || "Unknown"}</TableCell>
          </TableRow>
          <TableRow className="border-none">
            <TableHead className="p-0 h-0">Labels:</TableHead>
            <TableCell className="p-0">
              {labels[0]?.name || "Unknown"}
            </TableCell>
          </TableRow>
          <TableRow className="border-none">
            <TableHead className="p-0 h-0">Genres:</TableHead>
            <TableCell className="p-0">
              {genres.join(", ") || "Unknown"}
            </TableCell>
          </TableRow>
          <TableRow className="border-none">
            <TableHead className="p-0 h-0">Artists:</TableHead>
            <TableCell className="p-0">
              {artists.map((artist) => artist.name).join(", ") || "Unknown"}
            </TableCell>
          </TableRow>
          <TableRow className="border-none">
            <TableHead className="p-0 h-0">Shop:</TableHead>
            <TableCell className="p-0">
              <a
                href={`https://www.discogs.com/release/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 fit-content bg-black text-white hover:bg-gray-700"
              >
                On Discogs
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
