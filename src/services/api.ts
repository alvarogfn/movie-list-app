import { ErrorStatus } from "../enums/ErrorStatus";
import { ExpandedSerie } from "../model/ExpandedSerie";
import { ResumedSerie } from "../model/ResumedSerie";

const ENDPOINT = new URL("https://www.episodate.com/api");

async function searchByName(
  name: string,
  page: number
): Promise<{ result: ResumedSerie[]; totPages: number }> {
  const url = new URL("search", ENDPOINT.href);
  url.searchParams.append("q", name);
  url.searchParams.append("page", page.toString());

  const data = await fetch(url.href);
  if (data.status < 200 || data.status >= 400)
    throw new Error(ErrorStatus.code502);

  const { tv_shows, pages }: { tv_shows: ResumedSerie[]; pages: number } =
    await data.json();

  return { result: tv_shows, totPages: pages };
}

async function searchById(id: number) {
  const url = new URL("show-details", ENDPOINT.href);
  url.searchParams.append("q", id.toString());

  const data = await fetch(url.href);

  if (data.status < 200 || data.status >= 400)
    throw new Error(ErrorStatus.code502);

  const { tvShow }: { tvShow: ExpandedSerie } = await data.json();

  return tvShow;
}

const api = {
  searchByName,
  searchById,
};

export default api;
