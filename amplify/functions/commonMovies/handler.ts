import type { Schema } from "../../data/resource";
import { findCommonMovies } from "./intersection";
import { mapMovie } from "./mapper";
import { getMoviesForActors } from "./tmdb";

export const handler: Schema["commonMovies"]["functionHandler"] =
  async (event) => {
    const actorIds = event.arguments.actorIds.filter(
      (id): id is number => id !== null
    );

    const movieLists = await getMoviesForActors(actorIds);

    const commonMovies = findCommonMovies(movieLists);

    return commonMovies.map(mapMovie);

    console.log(commonMovies);
  };