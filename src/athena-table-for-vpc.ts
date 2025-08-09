import { aws_glue as glue, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Properties for the AthenaTableForVpcFlowLog construct.
 * This construct requires manual partition updates using MSCK REPAIR TABLE.
 */
export interface AthenaTableForVpcFlowLogProps {
  /**
   * The name of the S3 bucket where the VPC Flow Logs are stored.
   */
  readonly logBucketName: string;

  /**
   * The name of the Glue database where the table will be created.
   */
  readonly databaseName: string;

  /**
   * The name for the Glue table.
   */
  readonly tableName: string;

  /**
   * The prefix within the S3 bucket where logs are located, before the /AWSLogs/ part.
   * e.g., if logs are at `s3://<bucket>/vpc-logs/AWSLogs/...`, specify 'vpc-logs'.
   * @default No prefix is used.
   */
  readonly logPrefix?: string;
}

/**
 * A CDK construct to create an AWS Glue table for querying VPC Flow Logs with Athena.
 * NOTE: This table requires you to run `MSCK REPAIR TABLE` to discover new partitions.
 */
export class AthenaTableForVpcFlowLog extends Construct {
  public readonly table: glue.CfnTable;

  constructor(scope: Construct, id: string, props: AthenaTableForVpcFlowLogProps) {
    super(scope, id);

    const { logBucketName, databaseName, tableName, logPrefix } = props;

    const stack = Stack.of(this);
    const s3LocationPrefix = logPrefix ? `${logPrefix}/` : '';
    // The base location for the logs. Partitions will be discovered by MSCK REPAIR.
    const s3Location = `s3://${logBucketName}/${s3LocationPrefix}AWSLogs/`;

    this.table = new glue.CfnTable(this, 'Default', {
      catalogId: stack.account,
      databaseName: databaseName,
      tableInput: {
        name: tableName,
        description: 'Table for querying VPC Flow Logs (requires MSCK REPAIR)',
        tableType: 'EXTERNAL_TABLE',
        parameters: {
          // This property is for text-based formats and should not affect Parquet,
          // but can be useful if the source format changes.
          'skip.header.line.count': '1',
        },
        // Partition keys define the folder structure Athena will look for.
        // These names do NOT appear in the columns list below.
        partitionKeys: [
          { name: 'year', type: 'string' },
          { name: 'month', type: 'string' },
          { name: 'day', type: 'string' },
        ],
        storageDescriptor: {
          // Standard VPC Flow Log column format.
          columns: [
            { name: 'version', type: 'string' },
            { name: 'account_id', type: 'string' },
            { name: 'interface_id', type: 'string' },
            { name: 'srcaddr', type: 'string' },
            { name: 'dstaddr', type: 'string' },
            { name: 'srcport', type: 'string' },
            { name: 'dstport', type: 'string' },
            { name: 'protocol', type: 'string' },
            { name: 'packets', type: 'string' },
            { name: 'bytes', type: 'string' },
            { name: 'start', type: 'string' },
            { name: 'end', type: 'string' },
            { name: 'action', type: 'string' },
            { name: 'log_status', type: 'string' },
            // Additional fields can be added here if you use a custom log format.
          ],
          location: s3Location,
          // Settings for Parquet Format, as it's common for Flow Logs
          inputFormat: 'org.apache.hadoop.hive.ql.io.parquet.MapredParquetInputFormat',
          outputFormat: 'org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat',
          serdeInfo: {
            serializationLibrary: 'org.apache.hadoop.hive.ql.io.parquet.serde.ParquetHiveSerDe',
          },
        },
      },
    });
  }
}
