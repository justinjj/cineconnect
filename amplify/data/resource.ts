import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { searchActors } from "../functions/searchActors/resource";
import { commonMovies } from "../functions/commonMovies/resource";

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
    profileImage: a.string(),
  }),

  commonMovies: a
    .query()
    .arguments({
      actorIds: a.integer().array().required(),
    })
    .returns(a.ref("Movie").array())
    .authorization((allow) => [
      allow.publicApiKey(),
    ])
    .handler(a.handler.function(commonMovies)),

  Movie: a.customType({
    id: a.integer().required(),
    title: a.string().required(),
    posterImage: a.string(),
    releaseDate: a.string(),
  })
  
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
  },
});