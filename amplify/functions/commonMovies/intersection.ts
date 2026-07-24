import { MovieCredit } from "./types";

export function findCommonMovies(
  movieLists: MovieCredit[][]
): MovieCredit[] {
  if (movieLists.length === 0) {
    return [];
  }

  const commonIds = new Set(
    movieLists[0].map(movie => movie.id)
  );

  for (let i = 1; i < movieLists.length; i++) {
    const currentIds = new Set(
      movieLists[i].map(movie => movie.id)
    );

    for (const id of commonIds) {
      if (!currentIds.has(id)) {
        commonIds.delete(id);
      }
    }
  }

  return movieLists[0].filter(movie =>
    commonIds.has(movie.id)
  );
}