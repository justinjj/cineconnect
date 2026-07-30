import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { searchActors } from "../functions/searchActors/resource";
import { commonMovies } from "../functions/commonMovies/resource";
import { trendingComparisons } from "../functions/trendingComparisons/resource";

const schema = a.schema({
  searchActors: a
    .query()
    .arguments({
      query: a.string().required(),
    })
    .returns(
      a.ref("Actor").array()
    )
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(searchActors)),

  Actor: a.customType({
    id: a.integer().required(),
    name: a.string().required(),
    image: a.string(),
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

  ActorInput: a.customType({
    id: a.integer().required(),
    name: a.string().required(),
    image: a.string(),
  }),

  Movie: a.customType({
    id: a.integer().required(),
    title: a.string().required(),
    posterImage: a.string(),
    releaseDate: a.string(),
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

  ComparisonTrend: a.customType({
    comparisonKey: a.string().required(),
    searchCount: a.integer().required(),
    lastSearched: a.string().required(),
    actors: a.ref("Actor").array().required(),
  }),  
  
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
  },
});