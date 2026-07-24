import {
  Grid,
  Typography,
} from "@mui/material";

import MovieCard from "./MovieCard";
import type { Movie } from "../types";

type Props = {
  movies: Movie[];
};

export default function MovieGrid({
  movies,
}: Props) {
  if (movies.length === 0) {
    return (
      <Typography color="text.secondary">
        No common movies found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} mt={2}>
      {movies.map((movie) => (
        <Grid
          key={movie.id}
          size={{ xs: 12, sm: 6, md: 4 }}
        >
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}