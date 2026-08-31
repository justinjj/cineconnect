"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import { useComparison } from "@/app/context/ComparisonContext";
import type { Actor } from "@/types/actor";

type RecommendationActor = {
  id: number;
  name: string;
  image?: string | null;
};

type Recommendation = {
  comparisonKey: string;
  actors: (RecommendationActor | null | undefined)[];
  sharedMovieCount: number;
};

type ExploreMoreConnectionsProps = {
  recommendations: Recommendation[];
};

export default function ExploreMoreConnections({
  recommendations,
}: ExploreMoreConnectionsProps) {
  const {
    selectedActors,
    addActor,
  } = useComparison();

  const isSelected = (actorId: number) =>
    selectedActors.some(
      (actor: Actor) => actor.id === actorId
    );

  const canAddActor =
    selectedActors.length < 2;

  const handleAddActor = (
    actor: RecommendationActor
  ) => {
    addActor({
      id: actor.id,
      name: actor.name,
      profileImage: actor.image ?? null,
    });
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        🎬 Explore More Connections
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        You might be surprised who worked together.
      </Typography>

      <Grid container spacing={3}>
        {recommendations.map((recommendation) => {
          const [
            firstActor,
            secondActor,
          ] = recommendation.actors;

          if (!firstActor || !secondActor) {
            return null;
          }

          return (
            <Grid
              key={recommendation.comparisonKey}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  transition:
                    "transform 0.2s ease",
                  "&:hover": {
                    transform:
                      "translateY(-4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 4,
                    p: 3,
                  }}
                >
                  {/* First actor */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {firstActor.image ? (
                      <CardMedia
                        component="img"
                        image={firstActor.image}
                        alt={firstActor.name}
                        sx={{
                          width: 90,
                          height: 90,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 90,
                          height: 90,
                        }}
                      >
                        {firstActor.name.charAt(0)}
                      </Avatar>
                    )}

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        mt: 1,
                        textAlign: "center",
                      }}
                    >
                      {firstActor.name}
                    </Typography>

                    <Button
                      size="small"
                      onClick={() =>
                        handleAddActor(firstActor)
                      }
                      disabled={
                        !canAddActor &&
                        !isSelected(
                          firstActor.id
                        )
                      }
                    >
                      {isSelected(firstActor.id)
                        ? "✓ Added"
                        : "+ Add"}
                    </Button>
                  </Box>

                  {/* X */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      ×
                    </Typography>
                  </Box>

                  {/* Second actor */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {secondActor.image ? (
                      <CardMedia
                        component="img"
                        image={secondActor.image}
                        alt={secondActor.name}
                        sx={{
                          width: 90,
                          height: 90,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 90,
                          height: 90,
                        }}
                      >
                        {secondActor.name.charAt(0)}
                      </Avatar>
                    )}

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        mt: 1,
                        textAlign: "center",
                      }}
                    >
                      {secondActor.name}
                    </Typography>

                    <Button
                      size="small"
                      onClick={() =>
                        handleAddActor(secondActor)
                      }
                      disabled={
                        !canAddActor &&
                        !isSelected(
                          secondActor.id
                        )
                      }
                    >
                      {isSelected(secondActor.id)
                        ? "✓ Added"
                        : "+ Add"}
                    </Button>
                  </Box>
                </Box>

                <CardContent
                  sx={{
                    textAlign: "center",
                    pt: 0,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Worked together in{" "}
                    <strong>
                      {
                        recommendation.sharedMovieCount
                      }
                    </strong>{" "}
                    {recommendation.sharedMovieCount ===
                    1
                      ? "movie"
                      : "movies"}
                  </Typography>

                  <Button
                    href={`/${recommendation.comparisonKey}`}
                    variant="contained"
                    size="small"
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}