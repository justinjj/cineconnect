import { client } from "./client";

import type { Movie } from "../../features/movies/types";

export async function getCommonMovies(actorIds: number[]) {
  const { data, errors } = await client.queries.commonMovies({
    actorIds,
  });

  if (errors?.length) {
    throw new Error(errors[0].message);
  }

  return (data ?? []) as Movie[];
}