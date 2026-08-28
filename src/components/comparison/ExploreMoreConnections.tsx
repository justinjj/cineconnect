import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";

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
          const [firstActor, secondActor] =
            recommendation.actors;

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
              <Link
                href={`/${recommendation.comparisonKey}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  height: "100%",
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1.5,
                      p: 3,
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
                      <Box
                        sx={{
                          width: 90,
                          height: 90,
                          borderRadius: "50%",
                          bgcolor: "action.hover",
                        }}
                      />
                    )}

                    <Typography
                      variant="h5"
                      component="span"
                      sx={{ fontWeight: 700 }}
                    >
                      ×
                    </Typography>

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
                      <Box
                        sx={{
                          width: 90,
                          height: 90,
                          borderRadius: "50%",
                          bgcolor: "action.hover",
                        }}
                      />
                    )}
                  </Box>

                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600 }}
                    >
                      {firstActor.name} × {secondActor.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Worked together in{" "}
                      <strong>
                        {recommendation.sharedMovieCount}
                      </strong>{" "}
                      {recommendation.sharedMovieCount === 1
                        ? "movie"
                        : "movies"}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}