import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { searchActors } from "./functions/searchActors/resource";
import { commonMovies } from "./functions/commonMovies/resource";
import { trendingComparisons } from "./functions/trendingComparisons/resource";
import { CacheResources } from "./custom/cache/resource";
import { TrendResources } from "./custom/trend/resource";


/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  searchActors,
  commonMovies,
  trendingComparisons,
});

const cache = new CacheResources(
  backend.createStack("Cache"),
  "CacheResources"
);

cache.table.grantReadWriteData(backend.searchActors.resources.lambda);
cache.table.grantReadWriteData(backend.commonMovies.resources.lambda);

backend.searchActors.addEnvironment(
  "CACHE_TABLE_NAME",
  cache.table.tableName
);

backend.commonMovies.addEnvironment(
  "CACHE_TABLE_NAME",
  cache.table.tableName
);

const trend = new TrendResources(
  backend.createStack("Trend"),
  "TrendResources"
);

trend.table.grantReadWriteData(
  backend.commonMovies.resources.lambda
);

backend.commonMovies.addEnvironment(
  "TREND_TABLE_NAME",
  trend.table.tableName
);

trend.table.grantReadData(
  backend.trendingComparisons.resources.lambda
);

backend.trendingComparisons.addEnvironment(
  "TREND_TABLE_NAME",
  trend.table.tableName
);