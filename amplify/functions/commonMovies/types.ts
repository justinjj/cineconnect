export interface MovieCredit {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
}

export interface MovieSummary {
  id: number;
  title: string;
  posterImage: string | null;
  releaseDate: string;
}
