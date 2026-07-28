import type { Schema } from "../../data/resource";
import { CacheRepository } from "../../shared/cache/cacheRepository";
import { searchActors } from "./tmdb";
import { CacheKeys } from "../../shared/cache/cacheKeys";
import type { ActorSummary } from "./types";

const cache = new CacheRepository();


export const handler: Schema["searchActors"]["functionHandler"] = async (
  event
) => {

  const query = event.arguments.query;
  const cacheKey = CacheKeys.actorSearch(query);
  const cachedActors = await cache.get<ActorSummary[]>(cacheKey);

  if (cachedActors) {
    console.log("Cache hit:", cacheKey);
    return cachedActors;
  }

  console.log("Cache miss:", cacheKey);

  const actors = await searchActors(query);
  await cache.put(cacheKey, actors);

  return actors;
};