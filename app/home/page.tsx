"use client";

import { z } from "zod";
import { fetchSearch } from "@/app/lib/actions";
import SearchForm from "@/components/FormSearch";
import { FormSchema } from "../lib/formSchema";

export default function Page() {
  const handleOnSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetchSearch(values);
      console.log("RESPONSE SUCCESS", response);
    } catch (e) {
      console.log("Fetch Error: ", e);
    }
  };

  return <SearchForm onSubmit={handleOnSubmit} />;
}
