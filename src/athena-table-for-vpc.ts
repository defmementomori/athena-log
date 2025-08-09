import { aws_glue as glue, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Properties for the AthenaTableForVpcFlowLog construct.
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
   * e.g., if logs are at `s3://<bucket>/your-prefix/AWSLogs/`
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
    const s3Location = `s3://${logBucketName}/${s3LocationPrefix}AWSLogs/`;

    this.table = new glue.CfnTable(this, 'Default', {
      catalogId: stack.account,
      databaseName: databaseName,
      tableInput: {
        name: tableName,
        tableType: 'EXTERNAL_TABLE',
        parameters: {
          'skip.header.line.count': '1',
        },
        partitionKeys: [
          { name: 'aws-account-id', type: 'string' },
          { name: 'aws-service', type: 'string' },
          { name: 'aws-region', type: 'string' },
          { name: 'year', type: 'string' },
          { name: 'month', type: 'string' },
          { name: 'day', type: 'string' },
          { name: 'hour', type: 'string' },
        ],
        storageDescriptor: {
          columns: [
            { name: 'version', type: 'int' },
            { name: 'account_id', type: 'string' },
            { name: 'interface_id', type: 'string' },
            { name: 'srcaddr', type: 'string' },
            { name: 'dstaddr', type: 'string' },
            { name: 'srcport', type: 'int' },
            { name: 'dstport', type: 'int' },
            { name: 'protocol', type: 'bigint' },
            { name: 'packets', type: 'bigint' },
            { name: 'bytes', type: 'bigint' },
            { name: 'start', type: 'bigint' },
            { name: 'end', type: 'bigint' },
            { name: 'action', type: 'string' },
            { name: 'log_status', type: 'string' },
            { name: 'vpc_id', type: 'string' },
            { name: 'subnet_id', type: 'string' },
            { name: 'instance_id', type: 'string' },
            { name: 'tcp_flags', type: 'int' },
            { name: 'type', type: 'string' },
            { name: 'pkt_srcaddr', type: 'string' },
            { name: 'pkt_dstaddr', type: 'string' },
            { name: 'region', type: 'string' },
            { name: 'az_id', type: 'string' },
            { name: 'sublocation_type', type: 'string' },
            { name: 'sublocation_id', type: 'string' },
            { name: 'pkt_src_aws_service', type: 'string' },
            { name: 'pkt_dst_aws_service', type: 'string' },
            { name: 'flow_direction', type: 'string' },
            { name: 'traffic_path', type: 'int' },
          ],
          location: s3Location,
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
