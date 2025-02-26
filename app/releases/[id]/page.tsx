"use client";

import { use } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchRelease } from "@/lib/actions";
import { Release } from "@/types/DiscogsRelease";
import TrackListTable from "@/components/TrackListTable";
import ReleaseDetails from "@/components/ReleaseDetails";
import ReleaseImage from "@/components/ReleaseImage";
import spinner from "@/public/loading-spinner.gif";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [releaseData, setReleaseData] = useState<Release>();
  const [error, setError] = useState("");
  const { id } = use(params);

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
    <div className="max-w-[1000px] m-auto p-2">
      {error && <h1 className="text-center">😞 {error}</h1>}
      {releaseData ? (
        <>
          <div className="flex flex-row mt-9 mb-9">
            <ReleaseImage images={releaseData.images} />
            <ReleaseDetails
              title={releaseData.title}
              year={releaseData.year}
              country={releaseData.country}
              labels={releaseData.labels}
              genres={releaseData.genres}
              artists={releaseData.artists}
            />
          </div>
          <TrackListTable
            title={releaseData.title}
            tracklist={releaseData.tracklist}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Image src={spinner} alt="loading..." height={80} width={80} />
        </div>
      )}
    </div>
  );
}
