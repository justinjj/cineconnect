import { defineFunction, secret } from "@aws-amplify/backend";

export const searchActors = defineFunction({
  name: "searchActors",
  environment: {
    TMDB_API_KEY: "39591816e4bf5a10da89a2a632d8e4a3",
  },
});