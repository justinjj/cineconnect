import { client } from "./client";
import type { ComparisonTrend } from "../../features/trending/types";

export async function getTrendingComparisons(
  limit = 10
): Promise<ComparisonTrend[]> {
  const { data, errors } =
    await client.queries.trendingComparisons({
      limit,
    });

  if (errors?.length) {
    throw new Error(errors[0].message);
  }

  const trends = (data ?? []).filter(
    (
      trend
    ): trend is NonNullable<typeof trend> =>
      trend != null
  );

  return trends.map((trend) => ({
    comparisonKey: trend.comparisonKey,
    searchCount: trend.searchCount,
    lastSearched: trend.lastSearched,
    actors: trend.actors
      .filter(
        (
          actor
        ): actor is NonNullable<typeof actor> =>
          actor != null
      )
      .map((actor) => ({
        id: actor.id,
        name: actor.name,
        profileImage: actor.image ?? null,
      })),
  }));
}