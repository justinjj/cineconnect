import { useEffect, useState } from "react";
import { getTrendingComparisons } from "@/services/api/trendingApi";
import type { ComparisonTrend } from "@/types/trending";

export function useTrendingComparisons(limit = 10) {
  const [trends, setTrends] = useState<ComparisonTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    async function load() {
      try {
        const data = await getTrendingComparisons(limit);
        setTrends(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [limit]);

  return {
    trends,
    loading,
    error,
  };
}