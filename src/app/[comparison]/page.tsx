import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { notFound } from "next/navigation";

import {
  resolveActorBySlug,
} from "@/services/api/serverActorApi";

import {
  getCommonMoviesServer,
} from "@/services/api/serverCommonMoviesApi";

import type { Metadata } from "next";

export async function generateMetaData({
  params,
}: ComparisonPageProps): Promise<Metadata> {
  const { comparison } = await params;

  const slugs = parseComparison(comparison);

  if (!slugs) {
    return {
      title: "Movie Comparison | CineConnect"
    }
  }

  const [firstActor, secondActor] = 
    await Promise.all([
      resolveActorBySlug(slugs.first),
      resolveActorBySlug(slugs.second),
    ]);
  
  if (!firstActor || !secondActor) {
    return {
      title: "Movie Comparison | CineConnect",
    };
  }

  const title = `${firstActor.name} & ${secondActor.name} — Common Movies | CineConnect`;

  const description = 
    `Explore movies featuring both ${firstActor.name} and ${secondActor.name}. ` +
    `Discover their shared filmography on CineConnect.`;
  
  return {
    title,
    description,

    alternates: {
      canonical: `/${comparison}`,
    },

    openGraph: {
      title,
      description,
      type: "website"
    }
  };
}


type ComparisonPageProps = {
  params: Promise<{
    comparison: string;
  }>;
};

function parseComparison(value: string) {
  const parts = value.split("-and-");

  if (parts.length !== 2) {
    return null;
  }

  const [first, second] = parts;

  if (!first || !second) {
    return null;
  }

  return {
    first,
    second,
  };
}

export default async function ComparisonPage({
  params,
}: ComparisonPageProps) {
  const { comparison } = await params;

  const slugs = parseComparison(comparison);

  if (!slugs) {
    notFound();
  }

  const [firstActor, secondActor] =
    await Promise.all([
      resolveActorBySlug(slugs.first),
      resolveActorBySlug(slugs.second),
    ]);

  if (!firstActor || !secondActor) {
    notFound();
  }

  const movies = await getCommonMoviesServer(
    [firstActor.id, secondActor.id],
    [
      {
        id: firstActor.id,
        name: firstActor.name,
        image: firstActor.profileImage,
      },
      {
        id: secondActor.id,
        name: secondActor.name,
        image: secondActor.profileImage,
      },
    ]
  );

  return (
    <main>
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700
            }}
            gutterBottom
          >
            {firstActor.name} & {secondActor.name} — Common Movies
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 5 }}
          >
            Common Movies
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            {movies.length} common{" "}
            {movies.length === 1 ? "movie" : "movies"}
          </Typography>

          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid
                key={movie.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3,
                }}
              >
                <Card>
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
                        fontWeight:600
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
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </main>
  );
}