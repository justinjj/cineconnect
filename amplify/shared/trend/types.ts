export interface TrendActor {
  id: number;
  name: string;
  image?: string;
}

export interface ComparisonTrend {
    comparisonKey: string;

    actors: TrendActor[];

    searchCount: number;

    lastSearched: string;
}