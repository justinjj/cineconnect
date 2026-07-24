import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { searchActors } from "../functions/searchActors/resource";

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
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
  },
});