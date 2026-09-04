export interface RecentComparison {
  id: string;
  comparisonKey: string;

  firstActorId: number;
  firstActorName: string;
  firstActorImage?: string | null;

  secondActorId: number;
  secondActorName: string;
  secondActorImage?: string | null;

  searchedAt: string;
}