import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  UpdateCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

import { ComparisonTrend, TrendActor } from "./types";
import { buildComparisonKey } from "./trendKeys";

export class TrendRepository {

  private readonly client: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor() {
    const dynamoClient = new DynamoDBClient({});

    this.client = DynamoDBDocumentClient.from(dynamoClient);

    const tableName = process.env.TREND_TABLE_NAME;

    if (!tableName) {
      throw new Error("TREND_TABLE_NAME is not configured.");
    }

    this.tableName = tableName;
  }

  async incrementComparison(
    actors: TrendActor[]
  ): Promise<void> {

    if (actors.length < 2) {
      throw new Error("At least two actors are required.");
    }

    const sortedActors = [...actors].sort(
      (a, b) => a.id - b.id
    );

    const comparisonKey = buildComparisonKey(
      sortedActors[0].id,
      sortedActors[1].id
    );

    const now = new Date().toISOString();

    await this.client.send(
      new UpdateCommand({
        TableName: this.tableName,

        Key: {
          comparisonKey,
        },

        UpdateExpression: `
          ADD searchCount :increment
          SET
            lastSearched = :lastSearched,
            actors = if_not_exists(actors, :actors)
        `,

        ExpressionAttributeValues: {
          ":increment": 1,
          ":lastSearched": now,

          ":actors": sortedActors,
        },
      })
    );

  }

  async getTrendingComparisons(
    limit = 10
  ): Promise<ComparisonTrend[]> {

    const result = await this.client.send(
      new ScanCommand({
        TableName: this.tableName,
      })
    );

    const items = (result.Items ?? []) as ComparisonTrend[];

    return items
      .sort((a, b) => b.searchCount - a.searchCount)
      .slice(0, limit);
  }
}