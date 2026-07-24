import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useState } from "react";
import type { Actor } from "../../services/tmdb/tmdbService";
import ActorSearch from "../../features/actor-search/components/ActorSearch";
import MovieGrid from "../../features/movies/components/MovieGrid";

import { getCommonMovies, type Movie } from "../../services/api/movieApi"; // We'll create this type shortly

export default function HomePage() {

  const [actorOne, setActorOne] = useState<Actor | null>(null);
  const [actorTwo, setActorTwo] = useState<Actor | null>(null);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!actorOne || !actorTwo) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await getCommonMovies([
        actorOne.id,
        actorTwo.id,
      ]);

      console.log(result);

      setMovies(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container maxWidth="md">
      <Paper elevation={0} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h3" gutterBottom>
          CineConnect 🎬
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Find movies where two actors appeared together.
        </Typography>

        <Stack spacing={3}>
          <ActorSearch
            label="Actor 1"
            value={actorOne}
            onChange={setActorOne}
          />

          <ActorSearch
            label="Actor 2"
            value={actorTwo}
            onChange={setActorTwo}
          />

          <Box>
            <Button
              variant="contained"
              size="large"
              onClick={handleSearch}
              disabled={!actorOne || !actorTwo || loading}
            >
              {loading ? "Searching..." : "Find Common Movies"}
            </Button>
          </Box>

          <Box mt={2}>
            <MovieGrid movies={movies} />
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}