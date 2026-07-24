export interface TMDBPerson {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface SearchPersonResponse {
  page: number;
  results: TMDBPerson[];
  total_pages: number;
  total_results: number;
}