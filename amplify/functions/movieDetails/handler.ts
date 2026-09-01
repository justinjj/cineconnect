import type { Schema } from "../../data/resource";

import { CacheRepository } from "../../shared/cache/cacheRepository";
import { getMovieCredits, getMovieDetails } from "./tmdb";
import { CacheKeys } from "../../shared/cache/cacheKeys";

const cache = new CacheRepository();

type MovieDetailsResponse = {
  id: number;
  imdbId: string | null;
  title: string;
  overview: string | null;
  posterImage: string | null;
  releaseDate: string | null;
  cast: {
    id: number;
    name: string;
    character: string | null;
    image: string | null;
  }[];
};

export const handler: Schema["movieDetails"]["functionHandler"] = 
  async (event) => {
    const movieId = event.arguments.movieId;

    const cacheKey = CacheKeys.movieDetails(movieId);

    const cacheMovie = 
      await cache.get<MovieDetailsResponse>(cacheKey);

    if (cacheMovie) {
      console.log("Movie details cache hit:", cacheKey)
      return cacheMovie
    }

    console.log("Movie details cache miss:", cacheKey);

    const [movie, credits] = await Promise.all([
      getMovieDetails(movieId),
      getMovieCredits(movieId)
    ]);

    const result: MovieDetailsResponse = {
      id: movie.id,
      imdbId: movie.imdb_id ?? null,
      title: movie.title,
      overview: movie.overview ?? null,
      posterImage: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      releaseDate: movie.release_date || null,

      // Limit the initial cast list.
      cast: credits.slice(0, 20).map((actor) => ({
        id: actor.id,
        name: actor.name,
        character: actor.character ?? null,
        image: actor.profile_path
          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
          : null,
      })),
    };

    await cache.put(cacheKey, result);

    return result;
  };