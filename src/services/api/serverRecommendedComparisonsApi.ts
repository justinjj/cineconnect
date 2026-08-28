import { serverClient } from "./serverClient";

import type { Actor } from "@/types/actor";

export async function getRecommendedComparisonsServer(
  actorIds: number[],
  actors: Actor[]
) {
  const { data, errors } =
    await serverClient.queries.recommendedComparisons({
      actorIds,
      actors: actors.map((actor) => ({
        id: actor.id,
        name: actor.name,
        image: actor.profileImage,
      })),
    });

  if (errors?.length) {
    console.error(
      "Recommended comparisons error:",
      errors
    );

    return [];
  }

  return (data ?? []).filter(
    (recommendation) => recommendation != null
  );
}