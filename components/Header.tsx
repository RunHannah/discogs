"use client"

import { useRouter } from "next/navigation";
import SearchForm from "@/components/FormSearch";
import { SearchType } from "@/types/Search";

export default function Header() {
  const router = useRouter();

  const handleOnSubmit = async (values: SearchType) => {
    const { artist, releaseTitle, genre, page } = values;

    const queryString = new URLSearchParams();
    if (artist) queryString.append("artist", artist);
    if (releaseTitle) queryString.append("release_title", releaseTitle);
    if (genre) queryString.append("genre", genre);
    if (page) queryString.append("page", page.toString());

    router.push(`/search?${queryString}`);
  };

  return (
    <header className="flex flex-col justify-center items-center">
      <h1 className="sm:text-xl md:text-3xl lg:text-5xl">
        Search for music on Discogs
      </h1>
      <SearchForm onSubmit={handleOnSubmit} />
    </header>
  );
}
