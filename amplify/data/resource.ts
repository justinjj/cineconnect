import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { actorSchema } from "./schema/actor";
import { movieSchema } from "./schema/movies";
import { trendingSchema } from "./schema/trending";

const schema = a.schema({
  ...actorSchema,
  ...movieSchema,
  ...trendingSchema
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
  },
});