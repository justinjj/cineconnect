import { env } from "$amplify/env/movieDetails";

interface TMDBMovieDetails {
  id: number;
  imdb_id: string | null;
  title: string;
  overview: string | null;
  poster_path: string | null;
  release_date: string;
}

interface TMDBCastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
  order?: number;
}

interface TMDBCreditsResponse {
  cast: TMDBCastMember[];
}

export async function getMovieDetails(
  movieId: number
): Promise<TMDBMovieDetails> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${env.TMDB_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(
      `TMDB movie details returned ${response.status}`
    );
  }

  return (await response.json()) as TMDBMovieDetails;
}

export async function getMovieCredits(
  movieId: number
): Promise<TMDBCastMember[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${env.TMDB_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(
      `TMDB movie credits returned ${response.status}`
    );
  }

  const data =
    (await response.json()) as TMDBCreditsResponse;

  return data.cast;
}