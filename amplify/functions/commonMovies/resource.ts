import { defineFunction, secret } from "@aws-amplify/backend";

export const commonMovies = defineFunction({
  name: "commonMovies",
  environment: {
    TMDB_API_KEY: secret("TMDB_API_KEY"),
  },
});