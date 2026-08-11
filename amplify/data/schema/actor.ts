import { a } from "@aws-amplify/backend";

import { searchActors } from "../../functions/searchActors/resource";

export const actorSchema = {
  Actor: a.customType({
    id: a.integer().required(),
    name: a.string().required(),
    image: a.string(),
  }),

  ActorInput: a.customType({
    id: a.integer().required(),
    name: a.string().required(),
    image: a.string(),
  }),

  searchActors: a
    .query()
    .arguments({
      query: a.string().required(),
    })
    .returns(a.ref("Actor").array())
    .authorization((allow) => [
      allow.publicApiKey(),
    ])
    .handler(a.handler.function(searchActors)),
};