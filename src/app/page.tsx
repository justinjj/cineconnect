"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import ActorSearch from "@/components/actors/ActorSearch";
import { TrendingPairs } from "@/components/trending/TrendingPairs";

import type { Actor } from "@/types/actor";
import type { ComparisonTrend } from "@/types/trending";

function createActorSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createComparisonUrl(
  actor1: Actor,
  actor2: Actor
) {
  return `/${createActorSlug(actor1.name)}-and-${createActorSlug(
    actor2.name
  )}`;
}

export default function HomePage() {
  const router = useRouter();

  const [firstActor, setFirstActor] =
    useState<Actor | null>(null);

  const [secondActor, setSecondActor] =
    useState<Actor | null>(null);

  const handleCompare = () => {
    if (
      !firstActor ||
      !secondActor ||
      firstActor.id === secondActor.id
    ) {
      return;
    }

    router.push(
      createComparisonUrl(
        firstActor,
        secondActor
      )
    );
  };

  const handleTrendingSelect = (
    trend: ComparisonTrend
  ) => {
    if (trend.actors.length !== 2) {
      return;
    }

    const [actor1, actor2] = trend.actors;

    router.push(
      `/${createActorSlug(actor1.name)}-and-${createActorSlug(
        actor2.name
      )}`
    );
  };

  const canCompare =
    firstActor !== null &&
    secondActor !== null &&
    firstActor.id !== secondActor.id;

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 6 }}>
        <Typography
          component="h1"
          variant="h3"
          sx={{
            fontWeight: 700
          }}
          gutterBottom
        >
          Compare Actors
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Find movies shared by two actors.
        </Typography>

        <Stack spacing={3}>
          <ActorSearch
            label="First Actor"
            value={firstActor}
            onChange={setFirstActor}
          />

          <ActorSearch
            label="Second Actor"
            value={secondActor}
            onChange={setSecondActor}
          />

          <Button
            variant="contained"
            size="large"
            disabled={!canCompare}
            onClick={handleCompare}
          >
            Find Common Movies
          </Button>
        </Stack>

        <Box sx={{ mt: 6 }}>
          <TrendingPairs
            onSelect={handleTrendingSelect}
          />
        </Box>
      </Box>
    </Container>
  );
}