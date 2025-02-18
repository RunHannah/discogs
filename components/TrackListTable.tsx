import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Release } from "@/types/DiscogsRelease";

type TrackListTableProps = Pick<Release, "title" | "tracklist">;

export default function TrackListTable({
  tracklist,
}: TrackListTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Track</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tracklist.map((track) => (
          <TableRow key={track.title}>
            <TableCell>{track.position}</TableCell>
            <TableCell>{track.title}</TableCell>
            <TableCell>{track.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
