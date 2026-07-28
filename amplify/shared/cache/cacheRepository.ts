import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

import { CacheEntry } from "./types";
// 7 days = 7 * 24 * 60 * 60 seconds
const CACHE_TTL_SECONDS = 604800;

export class CacheRepository {

  private readonly client: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor() {
    const dynamoClient = new DynamoDBClient({});

    this.client = DynamoDBDocumentClient.from(dynamoClient);

    const tableName = process.env.CACHE_TABLE_NAME;

    if (!tableName) {
      throw new Error("CACHE_TABLE_NAME is not configured.");
    }

    this.tableName = tableName;
  }

  async get<T>(cacheKey: string): Promise<T | null> {
    const result = await this.client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: {
          cacheKey,
        },
      })
    );

    if(!result.Item) {
      return null;
    }

    const entry = result.Item as CacheEntry<T>;
    const now = Math.floor(Date.now() / 1000);

    if(now > entry.expiresAt) {
      return null
    }

    return entry.response;
  }

  async put<T>(cacheKey: string, response: T): Promise<void> {
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + CACHE_TTL_SECONDS;

    const entry: CacheEntry<T> = {
      cacheKey,
      response,
      expiresAt,
    }

    await this.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: entry
      })
    )

  }

}