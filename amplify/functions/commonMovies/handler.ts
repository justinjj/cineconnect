import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { env } from "$amplify/env/commonMovies";


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

const { resourceConfig, libraryOptions } = 
  await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);
const dataClient = generateClient<Schema>();

const recordRecentComparison = async (
  userId: string,
  actors: {
    id: number;
    name: string;
    image?: string;
  }[]
) => {
  if (actors.length !== 2) {
    return;
  }

  const sortedActors = [...actors].sort(
    (a, b) => a.id - b.id
  );

  const [firstActor, secondActor] = sortedActors;

  const comparisonKey =
    `${firstActor.id}-${secondActor.id}`;

  const { data: existingComparisons, errors } =
    await dataClient.models.RecentComparison
      .recentComparisonByUserAndKey({
        userId,
        comparisonKey: {
          eq: comparisonKey,
        }
      });
  
  if (errors?.length) {
    console.error(
      "Failed to find recent comparison:",
      errors
    );

    return;
  }

  if (existingComparisons.length === 0) {
    const { data, errors } =
      await dataClient.models.RecentComparison.create({
        userId,
        comparisonKey,

        firstActorId: firstActor.id,
        firstActorName: firstActor.name,
        firstActorImage: firstActor.image,

        secondActorId: secondActor.id,
        secondActorName: secondActor.name,
        secondActorImage: secondActor.image,

        searchedAt: new Date().toISOString(),
      });

    console.log("Created recent comparison:", data);
    console.log("Create errors:", errors);

    return;
  }

  const existingComparison = existingComparisons[0];

  const { data, errors: updateErrors } =
    await dataClient.models.RecentComparison.update({
      id: existingComparison.id,
      searchedAt: new Date().toISOString(),
    })
  
  console.log("Updated recent comparison:", data);
  console.log("Update errors:", updateErrors);
};


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

    const identity = event.identity;

    if (identity && "sub" in identity) {
      await recordRecentComparison(
        identity.sub,
        trendActors
      );
    }  

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

      if (cachedMovies.length > 0) {
        await recordTrend();
      }

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