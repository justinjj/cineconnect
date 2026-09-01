"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { useState } from "react";

import MovieDetailsDialog from "./MovieDetailsDialog";

type Movie = {
  id: number;
  title: string;
  posterImage?: string | null;
  releaseDate?: string | null;
};

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({
  movie,
}: MovieCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        sx={{
          cursor: "pointer",
          height: "100%",
          transition:
            "transform 0.2s ease",
          "&:hover": {
            transform:
              "translateY(-4px)",
          },
        }}
      >
        {movie.posterImage && (
          <CardMedia
            component="img"
            height="360"
            image={movie.posterImage}
            alt={movie.title}
          />
        )}

        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
            }}
          >
            {movie.title}
          </Typography>

          {movie.releaseDate && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {new Date(
                movie.releaseDate
              ).getFullYear()}
            </Typography>
          )}
        </CardContent>
      </Card>

      <MovieDetailsDialog
        movie={movie}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}