"use client";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState } from "react";

import { useComparison } from "@/app/context/ComparisonContext";
import { getMovieDetails } from "@/services/api/movieDetailsApi";

type Movie = {
  id: number;
  title: string;
  posterImage?: string | null;
  releaseDate?: string | null;
};

type CastMember = {
  id: number;
  name: string;
  character?: string | null;
  image?: string | null;
};

type MovieDetails = {
  id: number;
  imdbId?: string | null;
  title: string;
  overview?: string | null;
  posterImage?: string | null;
  releaseDate?: string | null;
  cast: (CastMember | null | undefined)[];
};

type MovieDetailsDialogProps = {
  movie: Movie | null;
  open: boolean;
  onClose: () => void;
};

export default function MovieDetailsDialog({
  movie,
  open,
  onClose,
}: MovieDetailsDialogProps) {
  const [details, setDetails] =
    useState<MovieDetails | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const {
    selectedActors,
    addActor,
  } = useComparison();

  useEffect(() => {
    if (!open || !movie) {
      return;
    }

    const loadMovieDetails = async () => {
      setLoading(true);
      setError(null);
      setDetails(null);

      try {
        const data = await getMovieDetails(movie.id);

        if (!data) {
          throw new Error(
            "Movie details not found"
          );
        }

        setDetails(data);        

        setDetails(data);
      } catch (error) {
        console.error(
          "Movie details error:",
          error
        );

        setError(
          "Unable to load movie details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [open, movie]);

  const isSelected = (actorId: number) =>
    selectedActors.some(
      (actor) => actor.id === actorId
    );

  const canAddActor =
    selectedActors.length < 2;

  const handleAddActor = (
    actor: CastMember
  ) => {
    addActor({
      id: actor.id,
      name: actor.name,
      profileImage: actor.image ?? null,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: 700 }}
        >
          {movie?.title ?? "Movie Details"}
        </Typography>

        <IconButton
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <DialogContent>
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 8,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography
            color="error"
            sx={{ py: 4 }}
          >
            {error}
          </Typography>
        )}

        {details && !loading && (
          <>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                mb: 4,
              }}
            >
              {details.posterImage && (
                <Box
                  component="img"
                  src={details.posterImage}
                  alt={details.title}
                  sx={{
                    width: 160,
                    height: 240,
                    objectFit: "cover",
                    borderRadius: 1,
                    flexShrink: 0,
                  }}
                />
              )}

              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {details.title}
                </Typography>

                {details.releaseDate && (
                  <Typography
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {new Date(
                      details.releaseDate
                    ).getFullYear()}
                  </Typography>
                )}

                {details.overview && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {details.overview}
                  </Typography>
                )}
              </Box>
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Cast
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 2,
              }}
            >
              {details.cast
                .filter(
                  (actor): actor is CastMember =>
                    actor != null
                )
                .map((actor) => (
                  <Box
                    key={actor.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.5,
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 2,
                    }}
                  >
                    {actor.image ? (
                      <Avatar
                        src={actor.image}
                        alt={actor.name}
                        sx={{
                          width: 52,
                          height: 52,
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 52,
                          height: 52,
                          flexShrink: 0,
                        }}
                      >
                        {actor.name.charAt(0)}
                      </Avatar>
                    )}

                    <Box
                      sx={{
                        flexGrow: 1,
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {actor.name}
                      </Typography>

                      {actor.character && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {actor.character}
                        </Typography>
                      )}

                      <Button
                        size="small"
                        sx={{
                          mt: 0.5,
                          p: 0,
                          minWidth: 0,
                        }}
                        onClick={() =>
                          handleAddActor(actor)
                        }
                        disabled={
                          !canAddActor &&
                          !isSelected(actor.id)
                        }
                      >
                        {isSelected(actor.id)
                          ? "✓ Added"
                          : "+ Add"}
                      </Button>
                    </Box>
                  </Box>
                ))}
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}