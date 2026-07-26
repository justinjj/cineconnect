import { env } from "$amplify/env/commonMovies";

import { MovieCredit } from "./types";

interface MovieCreditsResponse {
  cast: MovieCredit[];
}

export async function getMoviesForActor(actorId: number) {
  console.log("TMDB key exists:", !!env.TMDB_API_KEY);
  console.log("TMDB key length:", env.TMDB_API_KEY?.length);
  console.log("TMDB key prefix:", env.TMDB_API_KEY?.substring(0, 5));
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${env.TMDB_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`TMDB returned ${response.status}`);
  }

  const data =
    (await response.json()) as MovieCreditsResponse;

  return data.cast;
}

// 👇 Add this function below getMoviesForActor()

export async function getMoviesForActors(actorIds: number[]) {
  return Promise.all(
    actorIds.map(getMoviesForActor)
  );
}