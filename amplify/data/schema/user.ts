import { a } from "@aws-amplify/backend";

export const userSchema = {
  UserProfile: a
    .model({
      name: a.string(),
      email: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
    ]),
};