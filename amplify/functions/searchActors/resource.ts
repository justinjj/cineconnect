import { defineFunction, secret } from "@aws-amplify/backend";

export const searchActors = defineFunction({
  name: "searchActors",
  environment: {
    TMDB_API_KEY: secret("TMDB_API_KEY"),
  },
});