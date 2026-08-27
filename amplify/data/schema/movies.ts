import { a } from "@aws-amplify/backend";

import { commonMovies } from "../../functions/commonMovies/resource";
import { recommendedComparisons } from "../../functions/recommendedComparisons/resource";

export const movieSchema = {
  Movie: a.customType({
    id: a.integer().required(),
    title: a.string().required(),
    posterImage: a.string(),
    releaseDate: a.string(),
  }),

  ComparisonRecommendation: a.customType({
    comparisonKey: a.string().required(),
    actors: a.ref("Actor").array().required(),
    sharedMovieCount: a.integer().required(),
  }),

  commonMovies: a
    .query()
    .arguments({
      actorIds: a.integer().array().required(),
      actors: a.ref("ActorInput").array().required(),
    })
    .returns(a.ref("Movie").array())
    .authorization((allow) => [
      allow.publicApiKey(),
    ])
    .handler(a.handler.function(commonMovies)),

  recommendedComparisons: a
    .query()
    .arguments({
      actorIds: a.integer().array().required(),
      actors: a.ref("ActorInput").array().required(),
    })
    .returns(a.ref("ComparisonRecommendation").array())
    .authorization((allow) => [
      allow.publicApiKey(),
    ])
    .handler(a.handler.function(recommendedComparisons)),
};