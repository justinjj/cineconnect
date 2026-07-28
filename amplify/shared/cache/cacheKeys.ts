export class CacheKeys {
  static actorSearch(query: string): string {
    return `actor-search:${query.trim().toLowerCase()}`;
  }

  static commonMovies(actorIds: number[]): string {
    const sortedIds = [...actorIds].sort((a, b) => a - b);

    return `common-movies:${sortedIds.join("-")}`;
  }
}