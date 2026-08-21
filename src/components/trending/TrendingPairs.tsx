"use client";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import {
  Chip,
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
      <Typography
        variant="body2"
        sx={{ mb: 1 }}
      >
        Trending pairs
      </Typography>

      <Stack
        direction="row"
        useFlexGap
        sx={{
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {trends.map((trend) => {
          if(trend.actors.length !== 2) {
            return null;
          }

          const [actor1, actor2] = trend.actors;

          return (
            <Chip 
              key={trend.comparisonKey}
              icon={
                <LocalFireDepartmentIcon />
              }
              label={`${actor1.name} × ${actor2.name}`}
              clickable
              onClick={() => onSelect(trend)}
            />
          );
        })}
      </Stack>
    </>
  )
}