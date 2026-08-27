export interface ActorSummary {
  id: number;
  name: string;
  image: string | null;
}

export interface ComparisonRecommendation {
  comparisonKey: string;
  actors: ActorSummary[];
  sharedMovieCount: number;
  score: number;
}