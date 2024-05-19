import { Episode } from "./Episode";

export interface ExpandedSerie {
  id: 29560;
  name: string;
  permalink: string;
  url: string;
  description: string;
  description_source: string;
  start_date: string;
  end_date: null;
  country: string;
  status: string;
  runtime: number;
  network: string;
  youtube_link: string | null;
  image_path: string;
  image_thumbnail_path: string;
  rating: string;
  rating_count: string;
  countdown: number | null;
  genres: string[];
  pictures: string[];
  episodes: Episode[];
}
