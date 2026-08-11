import { a } from "@aws-amplify/backend";

import { trendingComparisons } from "../../functions/trendingComparisons/resource";

export const trendingSchema = {
  ComparisonTrend: a.customType({
    comparisonKey: a.string().required(),
    searchCount: a.integer().required(),
    lastSearched: a.string().required(),
    actors: a.ref("Actor").array().required(),
  }),

  trendingComparisons: a
    .query()
    .arguments({
      limit: a.integer(),
    })
    .returns(a.ref("ComparisonTrend").array())
    .authorization((allow) => [
      allow.publicApiKey(),
    ])
    .handler(a.handler.function(trendingComparisons)),
};