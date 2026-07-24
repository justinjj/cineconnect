import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import type { Movie } from "../types";

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardMedia
        component="img"
        height="360"
        image={
          movie.posterImage ??
          "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie.title}
      />

      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          {movie.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {movie.releaseDate || "Unknown"}
        </Typography>
      </CardContent>
    </Card>
  );
}