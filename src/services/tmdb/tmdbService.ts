import type { TMDBPerson } from "../../types/tmdb";
import { tmdbClient } from "./tmdbClient";

export interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

export async function searchActors(query: string): Promise<Actor[]> {
  if (!query.trim()) {
    return [];
  }

  const response = await tmdbClient.get("/search/person", {
    params: {
      query,
    },
  });

  return response.data.results.map((actor: TMDBPerson) => ({
    id: actor.id,
    name: actor.name,
    profile_path: actor.profile_path,
  }));
}