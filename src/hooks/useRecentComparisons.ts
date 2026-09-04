"use client";

import { useEffect, useState } from "react";

import { getRecentComparisons } from "@/services/api/recentComparisonsServerApi";
import type { RecentComparison } from "@/types/recentComparison";

export function useRecentComparisons() {
  const [comparisons, setComparisons] = useState<RecentComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function loadRecentComparisons() {
      try {
        setLoading(true);

        const data = await getRecentComparisons();

        setComparisons(data);
      } catch (err) {
        console.error("Failed to load recent comparisons:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadRecentComparisons();
  }, []);

  return {
    comparisons,
    loading,
    error,
  };
}