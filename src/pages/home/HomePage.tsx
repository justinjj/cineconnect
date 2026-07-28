import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useState } from "react";
import type { Actor } from "../../features/actor-search/types";
import ActorSearch from "../../features/actor-search/components/ActorSearch";
import MovieGrid from "../../features/movies/components/MovieGrid";

import { getCommonMovies } from "../../services/api/movieApi";
import type { Movie } from "../../features/movies/types";

export default function HomePage() {

  const [actorOne, setActorOne] = useState<Actor | null>(null);
  const [actorTwo, setActorTwo] = useState<Actor | null>(null);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {

    setHasSearched(true);
    
    if (!actorOne || !actorTwo) {
      return;
    }

    try {
      setLoading(true);

      const result = await getCommonMovies([
        actorOne.id,
        actorTwo.id,
      ]);

      setMovies(result);
    } catch (err) {
      console.log(err);
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
        <Typography 
          variant="h3"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
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

          <Box sx={{ textAlign: "center" }}>
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

          <Box sx={{ mt: 2 }}>
            <MovieGrid movies={movies} loading={loading} hasSearched={hasSearched} />
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}