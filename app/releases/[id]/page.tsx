"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchRelease } from "@/app/lib/actions";
import { Release } from "@/app/types/DiscogsRelease";
import TrackListTable from "@/components/TrackListTable";
import ReleaseDetails from "@/components/ReleaseDetails";
import ReleaseImage from "@/components/ReleaseImage";

export default function Page() {
  const [releaseData, setReleaseData] = useState<Release>();
  const [error, setError] = useState(false);
  const { id } = useParams();

  const fetchReleaseData = async (id: string) => {
    try {
      const results = await fetchRelease(id);
      if (results?.data) {
        setReleaseData(results.data);
      } else {
        setError(true);
        console.log("Error fetching release data");
      }
    } catch (e) {
      console.log("Release Page Error: ", e);
      setError(true);
    }
  };

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchReleaseData(id);
    }
  }, [id]);

  return (
    <div>
      {releaseData ? (
        <>
          <ReleaseImage images={releaseData.images} />
          <ReleaseDetails
            title={releaseData.title}
            year={releaseData.year}
            country={releaseData.country}
            labels={releaseData.labels}
            genres={releaseData.genres}
            artists={releaseData.artists}
          />
          <TrackListTable
            title={releaseData.title}
            tracklist={releaseData.tracklist}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
