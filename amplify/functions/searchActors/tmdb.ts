import { env } from "$amplify/env/searchActors";

import type { ActorSummary } from "./types";

interface TMDBPerson {
  id: number;
  name: string;
  profile_path: string | null;
}

interface TMDBSearchResponse {
  results: TMDBPerson[];
}

export async function searchActors(
  query: string
): Promise<ActorSummary[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(query)}&api_key=${env.TMDB_API_KEY}`
  );

  if (!response.ok) {
    const body = await response.text();
    console.error("TMDB status:", response.status);
    console.error("TMDB response:", body);

    throw new Error(`TMDB Error: ${response.status}`);
  }

  const data = (await response.json()) as TMDBSearchResponse;

  return data.results.map(actor => ({
    id: actor.id,
    name: actor.name,
    profileImage: actor.profile_path
      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
      : null,
  }));
}