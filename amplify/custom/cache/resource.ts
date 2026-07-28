import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { RemovalPolicy } from "aws-cdk-lib";

export class CacheResources extends Construct {
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.table = new dynamodb.Table(this, "ApiCache", {
      partitionKey: {
        name: "cacheKey",
        type: dynamodb.AttributeType.STRING,
      },

      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      
      timeToLiveAttribute: "expiresAt",

      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}