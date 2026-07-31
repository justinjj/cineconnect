import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Chip, Stack, Typography } from "@mui/material";

import { useTrendingComparisons } from "../hooks/useTrendingComparisons";
import type { ComparisonTrend } from "../types";

interface TrendingPairsProps {
  onSelect: (trend: ComparisonTrend) => void;
}

export function TrendingPairs({ onSelect }: TrendingPairsProps) {
  const { trends, loading, error } = useTrendingComparisons();

  if (loading || error || trends.length === 0) {
    return null;
  }

  return (
    <>
      <Typography variant="body2" sx={{ mb: 1 }}>
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
          if (trend.actors.length !== 2) {
            return null;
          }

          const [actor1, actor2] = trend.actors;

          return (
            <Chip
              key={trend.comparisonKey}
              icon={<LocalFireDepartmentIcon />}
              label={`${actor1.name} × ${actor2.name}`}
              clickable
              onClick={() => onSelect(trend)}
            />
          );
        })}
      </Stack>
    </>
  );
}