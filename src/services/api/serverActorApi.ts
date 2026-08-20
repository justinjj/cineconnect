import { serverClient } from "./serverClient";

import type { Actor } from "@/types/actor";

export async function resolveActorBySlug(
  slug: string
): Promise<Actor | null> {
  const { data, errors } =
    await serverClient.queries.searchActors({
      query: slug,
    });

  if (errors?.length) {
    throw new Error(errors[0].message);
  }

  const actors = (data ?? []).filter(
    (actor): actor is {
      id: number;
      name: string;
      image?: string | null;
    } =>
      actor != null &&
      actor.id !== undefined &&
      actor.name !== undefined
  );

  const normalizedSlug = slug
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  const actor = actors.find(
    (item) =>
      item.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-") === normalizedSlug
  );

  if (!actor) {
    return null;
  }

  return {
    id: actor.id,
    name: actor.name,
    profileImage: actor.image ?? null,
  };
}