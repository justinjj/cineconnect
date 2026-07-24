import { MovieCredit } from "./types";

export function mapMovie(movie: MovieCredit) {
  return {
    id: movie.id,
    title: movie.title,
    posterImage: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    releaseDate: movie.release_date,
  };
}