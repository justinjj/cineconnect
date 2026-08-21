import type { Actor } from "../features/actor-search/types";

export interface ComparisonTrend {
  comparisonKey: string;
  searchCount: number;
  lastSearched: string;
  actors: Actor[];
}