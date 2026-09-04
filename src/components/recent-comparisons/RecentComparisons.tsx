"use client";

import {
  Avatar,
  Box,
  Stack,
  Typography,
} from "@mui/material";

import { useRecentComparisons } from "@/hooks/useRecentComparisons";
import type { RecentComparison } from "@/types/recentComparison";

interface RecentComparisonsProps {
  onSelect: (comparison: RecentComparison) => void;
}

export function RecentComparisons({
  onSelect,
}: RecentComparisonsProps) {
  const {
    comparisons,
    loading,
    error,
  } = useRecentComparisons();

  if (loading) {
    return (
      <Typography variant="body2">
        Loading recent comparisons...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography
        variant="body2"
        color="error"
      >
        Failed to load recent comparisons:{" "}
        {String(error)}
      </Typography>
    );
  }

  if (comparisons.length === 0) {
    return null;
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
        {comparisons.map((comparison) => (
          <Box
            key={comparison.id}
            onClick={() => onSelect(comparison)}
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
              src={comparison.firstActorImage ?? undefined}
              alt={comparison.firstActorName}
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
              {comparison.firstActorName} ×{" "}
              {comparison.secondActorName}
            </Typography>

            <Avatar
              src={comparison.secondActorImage ?? undefined}
              alt={comparison.secondActorName}
              sx={{
                width: 28,
                height: 28,
              }}
            />
          </Box>
        ))}
      </Stack>
    </>
  );
}