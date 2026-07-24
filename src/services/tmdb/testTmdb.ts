import { tmdbClient } from "./tmdbClient";

export async function testTmdb() {
  const response = await tmdbClient.get("/search/person", {
    params: {
      query: "Mohanlal",
    },
  });

  console.log(response.data);
}