import { a } from "@aws-amplify/backend";
import { recentComparisonsFunction } from "../../functions/recentComparisons/resource";

export const recentComparisonSchema = {
  RecentComparison: a
    .model({
      comparisonKey: a.string().required(),

      userId: a.string().required(),

      firstActorId: a.integer().required(),
      firstActorName: a.string().required(),
      firstActorImage: a.string(),

      secondActorId: a.integer().required(),
      secondActorName: a.string().required(),
      secondActorImage: a.string(),

      searchedAt: a.datetime().required(),
    })
    .secondaryIndexes((index) => [
      index("userId")
        .sortKeys(["comparisonKey"])
        .queryField("recentComparisonByUserAndKey"),

      index("userId")
        .sortKeys(["searchedAt"])
        .queryField("recentComparisonByUser"),
    ])
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
    ]),

  recentComparisons: a
    .query()
    .returns(a.ref("RecentComparison").array())
    .authorization((allow) => [
      allow.authenticated(),
    ])
    .handler(
      a.handler.function(recentComparisonsFunction)
    ),
};