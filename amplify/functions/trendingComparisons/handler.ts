import type { Schema } from "../../data/resource";
import { TrendRepository } from "../../shared/trend/trendRepository";

const trendRepository = new TrendRepository();

export const handler: Schema["trendingComparisons"]["functionHandler"] =
  async (event) => {
    const limit = event.arguments.limit ?? 10;

    return trendRepository.getTrendingComparisons(limit);
  };