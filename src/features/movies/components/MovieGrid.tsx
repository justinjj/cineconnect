import {
  Grid,
  Typography,
  Box
} from "@mui/material";

import MovieCard from "./MovieCard";
import type { Movie } from "../types";
import MovieSkeleton from "./MovieSkeleton";

type Props = {
  movies: Movie[];
  loading: boolean;
  hasSearched: boolean;
};

export default function MovieGrid({
  movies,
  loading,
  hasSearched
}: Props) {
  if (hasSearched && movies.length === 0) {

    if (loading) {
      return (
          <Grid container spacing={3}>
              {Array.from({ length: 6 }).map((_, index) => (
                  <Grid
                      key={index}
                      size={{ xs:12, sm:6, md:4 }}
                  >
                      <MovieSkeleton />
                  </Grid>
              ))}
          </Grid>
      );
    }
    
    return (
      <Box
          py={8}
          textAlign="center"
      >
          <Typography variant="h5">
              🍿 No common movies found
          </Typography>

          <Typography color="text.secondary">
              Try selecting another pair of actors.
          </Typography>
      </Box>
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