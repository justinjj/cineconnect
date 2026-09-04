"use client";

import {
  Avatar,
  Box,
  Stack,
  Typography,
} from "@mui/material";

import { useTrendingComparisons } from "@/hooks/useTrendingComparisons";
import type { ComparisonTrend } from "@/types/trending";

interface TrendingPairsProps {
  onSelect: (trend: ComparisonTrend) => void;
}

export function TrendingPairs({
  onSelect,
}: TrendingPairsProps) {
  const {
    trends,
    loading,
    error,
  } = useTrendingComparisons();

  if (loading) {
    return (
      <Typography variant="body2">
        Loading trending pairs...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography
        variant="body2"
        color="error"
      >
        Failed to load trending pairs:{" "}
        {String(error)}
      </Typography>
    );
  }

  if (trends.length === 0) {
    return (
      <Typography variant="body2">
        No trending pairs available.
      </Typography>
    );
  }

  return (
    <>
      <Stack
        direction="row"
        useFlexGap
        sx={{
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {trends.map((trend) => {
          if (trend.actors.length !== 2) {
            return null;
          }

          const [actor1, actor2] = trend.actors;

          return (
            <Box
              key={trend.comparisonKey}
              onClick={() => onSelect(trend)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1,
                py: 0.5,
                borderRadius: 10,
                backgroundColor: "grey.100",
                cursor: "pointer",
              }}
            >
              <Avatar
                src={actor1.profileImage ?? undefined}
                alt={actor1.name}
                sx={{
                  width: 28,
                  height: 28,
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                {actor1.name} × {actor2.name}
              </Typography>

              <Avatar
                src={actor2.profileImage ?? undefined}
                alt={actor2.name}
                sx={{
                  width: 28,
                  height: 28,
                }}
              />
            </Box>
          );
        })}
      </Stack>
    </>
  );
}