"use server";

import { z } from "zod";
import { FormSchema } from "../lib/formSchema";
import { DiscogsResponse } from "../types/DiscogsResponse";

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const PER_PAGE = 20;
const ROOT_URL = "https://api.discogs.com";

export const fetchSearch = async ({
  artist,
  release_title,
  genre,
  page,
}: z.infer<typeof FormSchema>) => {
  if (!API_KEY || !API_SECRET) {
    return {
      error: "API key or secret is missing",
    };
  }

  const params = new URLSearchParams({
    key: API_KEY,
    secret: API_SECRET,
    per_page: PER_PAGE.toString(),
  });

  if (artist) params.append("artist", artist);
  if (release_title) params.append("release_title", release_title);
  if (genre) params.append("genre", genre);
  if (page) params.append("page", page.toString());

  try {
    const response = await fetch(
      `${ROOT_URL}/database/search?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: DiscogsResponse = await response.json();

    return {
      results: data.results,
      pagination: data.pagination,
    };
  } catch (error) {
    // Handle known error types
    if (error instanceof z.ZodError) {
      console.log("Zod Error: ", error.errors);
    }

    // Handle general errors
    if (error instanceof Error) {
      console.log("Error: ", error.message);
    }
  }
};
