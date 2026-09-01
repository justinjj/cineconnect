import { publicClient } from "./publicClient";

export async function getMovieDetails(
  movieId: number
) {
  const { data, errors } =
    await publicClient.queries.movieDetails({
      movieId,
    });

  if (errors?.length) {
    throw new Error(errors[0].message);
  }

  return data;
}