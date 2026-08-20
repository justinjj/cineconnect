"use client";

import { useState } from "react";
import { getCommonMovies } from "@/services/api/commonMoviesApi";
import { Movie } from "@/types/movie";

type ComparisonActor = {
  id: number;
  name: string;
  image?: string | null;
}

export function useCommonMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findCommonMovies = async (
    actorIds: number[],
    actors: ComparisonActor[]
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getCommonMovies(
        actorIds,
        actors
      );

      setMovies(result);
      return result;
    } catch (error) {
      console.error(
        "Failed to load common movies:",
        error
      );

      setMovies([]);

      const message = 
        error instanceof Error
          ? error.message
          : "Unable to find common movies"
        
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    movies,
    loading,
    error,
    findCommonMovies
  };
}