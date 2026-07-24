import { client } from "./client";

export async function searchActors(query: string) {
  const { data, errors } = await client.queries.searchActors({
    query,
  });

  if (errors?.length) {
    throw new Error(errors[0].message);
  }

  return data ?? [];
}