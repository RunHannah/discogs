"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchForm from "@/components/FormSearch";
import { SearchType } from "@/types/Search";

export default function Header() {
  const router = useRouter();

  const handleOnSubmit = async (values: SearchType) => {
    const { query, page } = values;

    const queryString = new URLSearchParams();
    if (query) queryString.append("q", query);
    if (page) queryString.append("page", page.toString());

    router.push(`/search?${queryString}`);
  };

  return (
    <header className="flex flex-col md:flex-row justify-center items-center md:items-end p-2 bg-neutral-900">
      <Link
        href="/"
        className="ml-2 mr-2 text-transition font-teko text-3xl lg:text-4xl xl:text-5xl text-white"
      >
        Music Search
      </Link>
      <SearchForm onSubmit={handleOnSubmit} />
    </header>
  );
}
