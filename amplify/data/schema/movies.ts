import { a } from "@aws-amplify/backend";

import { commonMovies } from "../../functions/commonMovies/resource";
import { recommendedComparisons } from "../../functions/recommendedComparisons/resource";
import { movieDetails } from "../../functions/movieDetails/resource";

export const movieSchema = {
  Movie: a.customType({
    id: a.integer().required(),
    title: a.string().required(),
    posterImage: a.string(),
    releaseDate: a.string(),
  }),

  MovieCastMember: a.customType({
    id: a.integer().required(),
    name: a.string().required(),
    character: a.string(),
    image: a.string(),
  }),

  MovieDetails: a.customType({
    id: a.integer().required(),
    imdbId: a.string(),
    title: a.string().required(),
    overview: a.string(),
    posterImage: a.string(),
    releaseDate: a.string(),
    cast: a.ref("MovieCastMember").array().required(),
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

  movieDetails: a
    .query()
    .arguments({
      movieId: a.integer().required(),
    })
    .returns(a.ref("MovieDetails"))
    .authorization((allow) => [
      allow.publicApiKey(),
    ])
    .handler(a.handler.function(movieDetails)),
};