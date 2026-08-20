import { publicClient } from "./publicClient";
import { analytics } from "@/services/analytics/analyticsService";
import type { Actor } from "@/types/actor";

export async function searchActors(query: string): Promise<Actor[]> {
  const { data, errors } = await publicClient.queries.searchActors({
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

export async function resolveActorBySlug(
  slug: string
): Promise<Actor | null> {
  const actors = await searchActors(slug);

  const normalizedSlug = slug
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  const exactMatch = actors.find((actor) =>
    actor.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-") === normalizedSlug
  );

  return exactMatch ?? null;
}