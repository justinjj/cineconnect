import { env } from "$amplify/env/commonMovies";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../data/resource";

const { resourceConfig, libraryOptions } =
  await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const dataClient = generateClient<Schema>();

export const handler: Schema["recentComparisons"]["functionHandler"] =
  async (event) => {
    console.log("Identity:", event.identity);

    const identity = event.identity;

    if (!identity || !("sub" in identity)) {
      return [];
    }

    const { data, errors } =
      await dataClient.models.RecentComparison.recentComparisonByUser(
        {
          userId: identity.sub,
        },
        {
          limit: 10,
          sortDirection: "DESC",
        }
      );

    if (errors?.length) {
      console.error("Failed to fetch recent comparisons:", errors);
      throw new Error("Failed to fetch recent comparisons");
    }

    return data ?? [];
  };