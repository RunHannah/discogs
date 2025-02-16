import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Release } from "@/app/types/DiscogsRelease";

type TrackListTableProps = Pick<Release, "title" | "tracklist">;

export default function TrackListTable({
  title,
  tracklist,
}: TrackListTableProps) {
  return (
    <Table className="max-w-4xl mx-auto">
      <TableCaption>{title}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Track</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tracklist.map((track) => (
          <TableRow key={track.position}>
            <TableCell>{track.position}</TableCell>
            <TableCell>{track.title}</TableCell>
            <TableCell>{track.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
