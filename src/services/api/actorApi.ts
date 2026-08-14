import { client } from "./client";
import { analytics } from "../../analytics/analyticsService";
import type { Actor } from "../../features/actor-search/types";

export async function searchActors(query: string): Promise<Actor[]> {
  const { data, errors } = await client.queries.searchActors({
    query,
  });

  if (errors?.length) {
    throw new Error(errors[0].message);
  }

  const actors = (data ?? []).filter(
    (
      actor
    ): actor is {
      id: number;
      name: string;
      image?: string | null;
    } => 
      actor != null &&
      actor.id !== undefined &&
      actor.name !== undefined
  );

  const result = actors.map((actor) => ({
    id: actor.id,
    name: actor.name,
    profileImage: actor.image ?? null,
  }));

  analytics.trackActorSearch(query, result.length);

  return result;
}