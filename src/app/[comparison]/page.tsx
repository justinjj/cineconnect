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
import type { Metadata } from "next";

import {
  resolveActorBySlug,
} from "@/services/api/serverActorApi";

import {
  getCommonMoviesServer,
} from "@/services/api/serverCommonMoviesApi";

import {
  getRecommendedComparisonsServer,
} from "@/services/api/serverRecommendedComparisonsApi";

import ExploreMoreConnections from "@/components/comparison/ExploreMoreConnections";
import MovieCard from "@/components/movie/MovieCard";


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

  const actors = [
    {
      id: firstActor.id,
      name: firstActor.name,
      profileImage: firstActor.profileImage,
    },
    {
      id: secondActor.id,
      name: secondActor.name,
      profileImage: secondActor.profileImage,
    },
  ];

  const [movies, recommendations] = await Promise.all([
    getCommonMoviesServer(
      [firstActor.id, secondActor.id],
      actors.map((actor) => ({
        id: actor.id,
        name: actor.name,
        image: actor.profileImage,
      }))
    ),

    getRecommendedComparisonsServer(
      [firstActor.id, secondActor.id],
      actors
    ),
  ]);

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
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          <ExploreMoreConnections
            recommendations={recommendations}
          />
        </Box>
      </Container>
    </main>
  );
}