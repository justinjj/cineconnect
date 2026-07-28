import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { searchActors } from "./functions/searchActors/resource";
import { commonMovies } from "./functions/commonMovies/resource";
import { CacheResources } from "./custom/cache/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  searchActors,
  commonMovies,
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