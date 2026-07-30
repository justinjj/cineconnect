import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { RemovalPolicy } from "aws-cdk-lib";

export class TrendResources extends Construct {
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.table = new dynamodb.Table(this, "ComparisonTrend", {
      partitionKey: {
        name: "comparisonKey",
        type: dynamodb.AttributeType.STRING,
      },

      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,

      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}