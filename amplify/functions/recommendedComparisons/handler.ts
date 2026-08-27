import type { Schema } from "../../data/resource";

import { getMovieCredits } from "../commonMovies/tmdb";
import { getMoviesForActors } from "../commonMovies/tmdb";
import { CacheRepository } from "../../shared/cache/cacheRepository";
import { CacheKeys } from "../../shared/cache/cacheKeys";


import type {
  ActorSummary,
  ComparisonRecommendation,
} from "./types";

const cache = new CacheRepository();

export const handler: Schema["recommendedComparisons"]["functionHandler"] =
  async (event) => {
    const actorIds = event.arguments.actorIds.filter(
      (id): id is number => id !== null
    );

    if (actorIds.length !== 2) {
      return [];
    }

    const cacheKey = CacheKeys.recommendedComparisons(actorIds);

    const cachedRecommendations =
      await cache.get<ComparisonRecommendation[]>(cacheKey);

    if (cachedRecommendations) {
      console.log("Recommendation cache hit:", cacheKey);
      return cachedRecommendations;
    }

    console.log("Recommendation cache miss:", cacheKey);

    const currentActorIds = new Set(actorIds);

    console.time("getMoviesForActors");

    const movieLists = await getMoviesForActors(actorIds);

    console.timeEnd("getMoviesForActors");

    const [firstMovies, secondMovies] = movieLists;

    const secondMovieIds = new Set(
      secondMovies.map((movie) => movie.id)
    );

    const commonMovies = firstMovies.filter((movie) =>
      secondMovieIds.has(movie.id)
    );

    console.log(
      "Common movies:",
      commonMovies.length
    );

    if (commonMovies.length === 0) {
      return [];
    }

    console.time("getMovieCredits");

    const MAX_MOVIES_FOR_RECOMMENDATIONS = 10;

    const moviesForRecommendations = commonMovies.slice(0, MAX_MOVIES_FOR_RECOMMENDATIONS);

    const creditsByMovie = await Promise.all(
      moviesForRecommendations.map((movie) =>
        getMovieCredits(movie.id)
      )
    );

    console.timeEnd("getMovieCredits");

    const collaboratorMap = new Map<
      number,
      {
        actor: ActorSummary;
        count: number;
      }
    >();

    for (const cast of creditsByMovie) {
      const actorsInMovie = new Set<number>();

      for (const actor of cast) {
        if (
          currentActorIds.has(actor.id) ||
          actorsInMovie.has(actor.id)
        ) {
          continue;
        }

        actorsInMovie.add(actor.id);

        const existing = collaboratorMap.get(actor.id);

        const summary: ActorSummary = {
          id: actor.id,
          name: actor.name,
          image: actor.profile_path
            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
            : null,
        };

        collaboratorMap.set(actor.id, {
          actor: summary,
          count: (existing?.count ?? 0) + 1,
        });
      }
    }

    const collaborators = [...collaboratorMap.values()]
      .sort((a, b) => {
        // Stronger collaboration first
        if (b.count !== a.count) {
          return b.count - a.count;
        }

        // Stable fallback for equal counts
        return a.actor.name.localeCompare(b.actor.name);
      })
      .slice(0, 10);

const recommendations: ComparisonRecommendation[] = [];

const currentActors = actorIds
  .map((id) =>
    event.arguments.actors?.find(
      (actor) => actor?.id === id
    )
  )
  .filter(
    (actor): actor is NonNullable<typeof actor> =>
      actor != null
  );

  // Track collaborators we've already used.
  const usedCollaborators = new Set<number>();

  // Alternate between the two original actors
  // to create more variety.
  for (
    let index = 0;
    index < collaborators.length && recommendations.length < 5;
    index++
  ) {
    const collaborator = collaborators[index];

    if (usedCollaborators.has(collaborator.actor.id)) {
      continue;
    }

    const currentActor =
      currentActors[index % currentActors.length];

    if (!currentActor) {
      continue;
    }

    usedCollaborators.add(collaborator.actor.id);

    recommendations.push({
      comparisonKey: [
        currentActor.name,
        collaborator.actor.name,
      ]
        .map((name) =>
          name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
        )
        .join("-and-"),

      actors: [
        {
          id: currentActor.id,
          name: currentActor.name,
          image: currentActor.image ?? null,
        },
        collaborator.actor,
      ],

      sharedMovieCount: collaborator.count,

      score: collaborator.count,
    });
  }

    const seen = new Set<string>();

    const result = recommendations
      .filter((recommendation) => {
        if (seen.has(recommendation.comparisonKey)) {
          return false;
        }

        seen.add(recommendation.comparisonKey);
        return true;
      })
      .sort(
        (a, b) => b.score - a.score
      )
      .slice(0, 5);

    await cache.put(cacheKey, result);

    console.log("Recommendation cache stored:", cacheKey);

    return result;
  };