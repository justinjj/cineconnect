import type { Actor } from "../../features/actor-search/types";
import type { Movie } from "../../features/movies/types";
import { client } from "./client";


export async function getCommonMovies(actors: Actor[]) {

  const payload = {
    actorIds: actors.map((a) => a.id),
    actors: actors.map((a) => ({
      id: a.id,
      name: a.name,
      image: a.profileImage,
    })),
  };

  const { data, errors } = await client.queries.commonMovies(payload);

  if (errors?.length) {
    throw new Error(errors[0].message);
  }

  return (data ?? []) as Movie[];
}