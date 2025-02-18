"use client";

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
    <header className="flex flex-col md:flex-row justify-center items-center md:items-end p-2 bg-neutral-900">
      <h1 className="ml-2 mr-2 text-3xl lg:text-4xl text-white">Music Search</h1>
      <SearchForm onSubmit={handleOnSubmit} />
    </header>
  );
}
