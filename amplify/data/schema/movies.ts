import { a } from "@aws-amplify/backend";

import { commonMovies } from "../../functions/commonMovies/resource";

export const movieSchema = {
  Movie: a.customType({
    id: a.integer().required(),
    title: a.string().required(),
    posterImage: a.string(),
    releaseDate: a.string(),
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
};