import { defineFunction } from "@aws-amplify/backend";

export const recommendedComparisons = defineFunction({
  name: "recommendedComparisons",
  timeoutSeconds: 10,
  environment: {
    TMDB_API_KEY: "39591816e4bf5a10da89a2a632d8e4a3",
  },
});