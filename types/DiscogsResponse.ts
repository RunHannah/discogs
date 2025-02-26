// https://quicktype.io/

export interface DiscogsResponse {
  pagination: Pagination;
  results: Result[];
}

export interface Pagination {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls: Urls;
}

export interface Urls {
  last: string;
  next: string;
}

export interface Result {
  country: string;
  year?: string;
  format: string[];
  label: string[];
  type: Type;
  genre: Genre[];
  style: string[];
  id: number;
  barcode: string[];
  master_id: number;
  master_url: string;
  uri: string;
  catno: string;
  title: string;
  thumb: string;
  cover_image: string;
  resource_url: string;
  community: Community;
  format_quantity?: number;
  formats?: Format[];
}

export interface Community {
  want: number;
  have: number;
}

export interface Format {
  name: string;
  qty: string;
  text?: string;
  descriptions: string[];
}

export enum Genre {
  Electronic = "Electronic",
  FunkSoul = "Funk / Soul",
  HipHop = "Hip Hop",
  NonMusic = "Non-Music",
  Pop = "Pop",
  Rock = "Rock",
}

export enum Type {
  Master = "master",
  Release = "release",
}
