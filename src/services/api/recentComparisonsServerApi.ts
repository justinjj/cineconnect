import { client } from "./client";
import type { RecentComparison } from "@/types/recentComparison";

export async function getRecentComparisons(): Promise<RecentComparison[]> {
  const { data, errors } =
    await client.queries.recentComparisons();

  if (errors?.length) {
    console.error("Failed to fetch recent comparisons:", errors);
    throw new Error("Failed to fetch recent comparisons");
  }

  return (data ?? []) as RecentComparison[];
}