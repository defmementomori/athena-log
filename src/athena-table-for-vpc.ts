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
   * The start date for the partition projection, in 'YYYY/MM/DD' format.
   * This determines the earliest logs that can be queried.
   */
  readonly projectionStartDate: string;

  /**
   * The prefix within the S3 bucket where logs are located, before the /AWSLogs/ part.
   * e.g., if logs are at `s3://<bucket>/vpc-logs/AWSLogs/...`, specify 'vpc-logs'.
   * @default No prefix is used.
   */
  readonly logPrefix?: string;
}

/**
 * A CDK construct to create an AWS Glue table for querying VPC Flow Logs with Athena.
 * It is optimized for Parquet format and uses partition projection for automatic partition management.
 */
export class AthenaTableForVpcFlowLog extends Construct {
  /**
   * The created Glue Table resource.
   */
  public readonly table: glue.CfnTable;

  constructor(scope: Construct, id: string, props: AthenaTableForVpcFlowLogProps) {
    super(scope, id);

    const { logBucketName, databaseName, tableName, projectionStartDate, logPrefix } = props;

    // Validate required properties
    if (!logBucketName || !databaseName || !tableName || !projectionStartDate) {
      throw new Error('logBucketName, databaseName, tableName, and projectionStartDate are required.');
    }

    const stack = Stack.of(this);
    const account = stack.account;
    const region = stack.region;

    const s3LocationPrefix = logPrefix ? `${logPrefix}/` : '';
    // Standard path for VPC Flow Logs partitioned by date
    const s3LocationTemplate = `s3://${logBucketName}/${s3LocationPrefix}AWSLogs/aws-account-id=${account}/aws-service=vpcflowlogs/aws-region=\${region}/year=\${year}/month=\${month}/day=\${day}/`;
    const s3BaseLocation = `s3://${logBucketName}/${s3LocationPrefix}AWSLogs/`;

    this.table = new glue.CfnTable(this, 'Default', {
      catalogId: account,
      databaseName: databaseName,
      tableInput: {
        name: tableName,
        description: 'Table for querying VPC Flow Logs',
        tableType: 'EXTERNAL_TABLE',
        parameters: {
          // --- Partition Projection Settings ---
          'projection.enabled': 'true',
          'projection.region.type': 'enum',
          'projection.region.values': region, // Use the region of the stack
          'projection.year.type': 'integer',
          'projection.year.range': projectionStartDate.substring(0, 4) + ',NOW',
          'projection.month.type': 'integer',
          'projection.month.range': '01,12',
          'projection.day.type': 'integer',
          'projection.day.range': '01,31',
          'storage.location.template': s3LocationTemplate,
        },
        // The columns that act as partitions
        partitionKeys: [
          { name: 'region', type: 'string' },
          { name: 'year', type: 'string' },
          { name: 'month', type: 'string' },
          { name: 'day', type: 'string' },
        ],
        storageDescriptor: {
          // Columns from the VPC Flow Log format
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
          location: s3BaseLocation,
          // --- Settings for Parquet Format ---
          inputFormat: 'org.apache.hadoop.hive.ql.io.parquet.MapredParquetInputFormat',
          outputFormat: 'org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat',
          serdeInfo: {
            serializationLibrary: 'org.apache.hadoop.hive.ql.io.parquet.serde.ParquetHiveSerDe',
          },
          compressed: false, // Parquet handles its own compression internally
        },
      },
    });
  }
}
