import { publicClient } from "./publicClient";
import type { Movie } from "@/types/movie";

export async function getCommonMovies(
  actorIds: number[],
  actors: {
    id: number;
    name: string;
    image?: string | null;
  }[]
): Promise<Movie[]> {
  const { data, errors } =
    await publicClient.queries.commonMovies({
      actorIds,
      actors,
    });

  if (errors?.length) {
    throw new Error(errors[0].message);
  }

  return (data ?? []).filter(
    (movie): movie is Movie => movie != null
  );
}