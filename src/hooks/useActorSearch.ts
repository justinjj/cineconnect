"use client";

import { useState } from "react";

import { searchActors } from "@/services/api/actorApi";
import type { Actor } from "@/types/actor";

export function useActorSearch() {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setActors([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchActors(trimmedQuery);

      setActors(results);
    } catch (error) {
      console.error("Actor search failed:", error);

      setActors([]);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to search actors"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    actors,
    loading,
    error,
    search,
  };
}