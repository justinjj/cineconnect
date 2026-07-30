import type { Schema } from "../../data/resource";
import { findCommonMovies } from "./intersection";
import { mapMovie } from "./mapper";
import { getMoviesForActors } from "./tmdb";

import { CacheRepository } from "../../shared/cache/cacheRepository";
import { TrendRepository } from "../../shared/trend/trendRepository";
import { CacheKeys } from "../../shared/cache/cacheKeys";
import { MovieSummary } from "./types";

const cache = new CacheRepository();
const trend = new TrendRepository();

export const handler: Schema["commonMovies"]["functionHandler"] =
  async (event) => {
    const actorIds = event.arguments.actorIds.filter(
      (id): id is number => id !== null
    );

    const trendActors = (event.arguments.actors ?? [])
      .filter((actor): actor is NonNullable<typeof actor> => actor != null)
      .map(actor => ({
        id: actor.id,
        name: actor.name,
        image: actor.image ?? undefined,
      }));

    const recordTrend = async () => {
      try {
          await trend.incrementComparison(trendActors);
      } catch (error) {
          console.error("Failed to record trend", error);
      }
    };
  
    const cacheKey = CacheKeys.commonMovies(actorIds);

    const cachedMovies = await cache.get<MovieSummary[]>(cacheKey);
    
    if (cachedMovies) {
      console.log("Movie Cache hit:", cacheKey);

      await recordTrend();

      return cachedMovies;
    }

    console.log("Movie cache miss:", cacheKey);

    const movieLists = await getMoviesForActors(actorIds);

    const commonMovies = findCommonMovies(movieLists);

    const movies = commonMovies.map(mapMovie);

    if (movies.length > 0) {
      await recordTrend();
    }

    await cache.put(cacheKey, movies);

    return movies;

  };