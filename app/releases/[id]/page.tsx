"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchRelease } from "@/lib/actions";
import { Release } from "@/types/DiscogsRelease";
import TrackListTable from "@/components/TrackListTable";
import ReleaseDetails from "@/components/ReleaseDetails";
import ReleaseImage from "@/components/ReleaseImage";

export default function Page() {
  const [releaseData, setReleaseData] = useState<Release>();
  const [error, setError] = useState("");
  const { id } = useParams();

  const fetchReleaseData = async (id: string) => {
    try {
      const response = await fetchRelease(id);
      if (response?.data) {
        setReleaseData(response.data);
      }

      if (response?.error) {
        setError(response.error);
      }
    } catch (error) {
      console.log("Releases page Error: ", error);
    }
  };

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchReleaseData(id);
    }
  }, [id]);

  return (
    <div>
      {error && <h1 className="text-center">😞 {error}</h1>}
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
