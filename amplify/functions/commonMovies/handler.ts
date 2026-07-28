import type { Schema } from "../../data/resource";
import { findCommonMovies } from "./intersection";
import { mapMovie } from "./mapper";
import { getMoviesForActors } from "./tmdb";

import { CacheRepository } from "../../shared/cache/cacheRepository";
import { CacheKeys } from "../../shared/cache/cacheKeys";
import { MovieCredit, MovieSummary } from "./types";

const cache = new CacheRepository();

export const handler: Schema["commonMovies"]["functionHandler"] =
  async (event) => {
    const actorIds = event.arguments.actorIds.filter(
      (id): id is number => id !== null
    );
  
    const cacheKey = CacheKeys.commonMovies(actorIds);

    const cachedMovies = await cache.get<MovieSummary[]>(cacheKey);
    
    if (cachedMovies) {
      console.log("Movie Cache hit:", cacheKey);
      return cachedMovies;
    }

    console.log("Movie cache miss:", cacheKey);

    const movieLists = await getMoviesForActors(actorIds);

    const commonMovies = findCommonMovies(movieLists);

    const movies = commonMovies.map(mapMovie);

    await cache.put(cacheKey, movies);

    return movies;

  };