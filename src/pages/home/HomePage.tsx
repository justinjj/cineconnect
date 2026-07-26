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
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {

    setHasSearched(true);
    
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
      <Paper elevation={0} 
        sx={{
            p:{
                xs:2,
                md:4,
            },
            mt:{
                xs:2,
                md:8,
            },
        }}
      >
        <Typography variant="h3" textAlign="center" gutterBottom>
          CineConnect 🎬
        </Typography>

        <Typography color="text.secondary">
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

          <Box textAlign="center">
            <Button
              variant="contained"
              size="large"
              onClick={handleSearch}
              disabled={!actorOne || !actorTwo || loading}
            >
              {loading ? "Searching..." : "🎬 Find Common Movies"}
            </Button>
          </Box>

          {hasSearched && movies.length > 0 && (
            <Typography
              variant="h5"
              sx={{ mt: 4, mb: 2 }}
            >
              Results ({movies.length})
            </Typography>
          )}

          <Box mt={2}>
            <MovieGrid movies={movies} loading={loading} hasSearched={hasSearched} />
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}