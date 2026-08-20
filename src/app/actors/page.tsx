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
import type { Actor } from "@/types/actor";

function createActorSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ActorsPage() {
  const router = useRouter();

  const [firstActor, setFirstActor] =
    useState<Actor | null>(null);

  const [secondActor, setSecondActor] =
    useState<Actor | null>(null);

  const handleCompare = () => {
    if (!firstActor || !secondActor) {
      return;
    }

    const firstSlug = createActorSlug(firstActor.name);
    const secondSlug = createActorSlug(secondActor.name);

    router.push(
      `/${firstSlug}-and-${secondSlug}`
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
            fontWeight:700
          }}
          gutterBottom
        >
          Compare Actors
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 5 }}
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
      </Box>
    </Container>
  );
}