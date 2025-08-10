import { aws_glue as glue, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface AthenaTableForCloudFrontProps {
  /**
   * The name of the S3 bucket where the processed, Parquet-formatted CloudFront logs are stored.
   */
  readonly logBucketName: string;

  /**
   * The name of the Glue database for this table.
   */
  readonly databaseName: string;

  /**
   * The name for the Glue table.
   */
  readonly tableName: string;

  /**
   * The start date for the partition projection, in 'YYYY/MM/DD' format.
   */
  readonly projectionStartDate: string;

  /**
   * The prefix within the S3 bucket where the partitioned Parquet files are located.
   * e.g., `s3://your-bucket/my-parquet-prefix/year=...`
   * @default No prefix is used.
   */
  readonly logPrefix?: string;
}

/**
 * Creates a Glue table for querying Parquet-formatted, partitioned CloudFront logs.
 * NOTE: This construct assumes an ETL process converts raw CloudFront logs into
 * a partitioned Parquet format in S3.
 */
export class AthenaTableForCloudFront extends Construct {
  public readonly table: glue.CfnTable;

  constructor(scope: Construct, id: string, props: AthenaTableForCloudFrontProps) {
    super(scope, id);

    const { logBucketName, databaseName, tableName, projectionStartDate, logPrefix } = props;

    const stack = Stack.of(this);
    const s3LocationPrefix = logPrefix ? `${logPrefix}/` : '';
    const s3LocationTemplate = `s3://${logBucketName}/${s3LocationPrefix}year=\${year}/month=\${month}/day=\${day}/`;
    const s3BaseLocation = `s3://${logBucketName}/${s3LocationPrefix}`;

    this.table = new glue.CfnTable(this, 'Default', {
      catalogId: stack.account,
      databaseName: databaseName,
      tableInput: {
        name: tableName,
        description: 'Table for partitioned, Parquet-formatted CloudFront logs',
        tableType: 'EXTERNAL_TABLE',
        parameters: {
          'projection.enabled': 'true',
          'projection.year.type': 'integer',
          'projection.year.range': projectionStartDate.substring(0, 4) + ',2200',
          'projection.month.type': 'integer',
          'projection.month.range': '01,12',
          'projection.day.type': 'integer',
          'projection.day.range': '01,31',
          'storage.location.template': s3LocationTemplate,
        },
        partitionKeys: [
          { name: 'year', type: 'integer' },
          { name: 'month', type: 'integer' },
          { name: 'day', type: 'integer' },
        ],
        storageDescriptor: {
          columns: [
            { name: 'timestamp', type: 'timestamp' },
            { name: 'c_ip', type: 'string' },
            { name: 'time_to_first_byte', type: 'double' },
            { name: 'sc_status', type: 'int' },
            { name: 'sc_bytes', type: 'bigint' },
            { name: 'cs_method', type: 'string' },
            { name: 'cs_protocol', type: 'string' },
            { name: 'cs_host', type: 'string' },
            { name: 'cs_uri_stem', type: 'string' },
            { name: 'cs_bytes', type: 'bigint' },
            { name: 'x_edge_location', type: 'string' },
            { name: 'x_edge_request_id', type: 'string' },
            { name: 'x_host_header', type: 'string' },
            { name: 'time_taken', type: 'double' },
            { name: 'cs_protocol_version', type: 'string' },
            { name: 'c_ip_version', type: 'string' },
            { name: 'cs_user_agent', type: 'string' },
            { name: 'cs_referer', type: 'string' },
            { name: 'cs_cookie', type: 'string' },
            { name: 'cs_uri_query', type: 'string' },
            { name: 'x_edge_response_result_type', type: 'string' },
            { name: 'x_forwarded_for', type: 'string' },
            { name: 'ssl_protocol', type: 'string' },
            { name: 'ssl_cipher', type: 'string' },
            { name: 'x_edge_result_type', type: 'string' },
            { name: 'fle_encrypted_fields', type: 'int' },
            { name: 'fle_status', type: 'string' },
            { name: 'sc_content_type', type: 'string' },
            { name: 'sc_content_len', type: 'bigint' },
            { name: 'sc_range_start', type: 'bigint' },
            { name: 'sc_range_end', type: 'bigint' },
          ],
          location: s3BaseLocation,
          inputFormat: 'org.apache.hadoop.hive.ql.io.parquet.MapredParquetInputFormat',
          outputFormat: 'org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat',
          serdeInfo: {
            serializationLibrary: 'org.apache.hadoop.hive.ql.io.parquet.serde.ParquetHiveSerDe',
            parameters: {
              path: 'timestamp, c_ip, time_to_first_byte, sc_status, sc_bytes, cs_method, cs_protocol, cs_host, cs_uri_stem, cs_bytes, x_edge_location, x_edge_request_id, x_host_header, time_taken, cs_protocol_version, c_ip_version, cs_user_agent, cs_referer, cs_cookie, cs_uri_query, x_edge_response_result_type, x_forwarded_for, ssl_protocol, ssl_cipher, x_edge_result_type, fle_encrypted_fields, fle_status, sc_content_type, sc_content_len, sc_range_start, sc_range_end',
            },
          },
        },
      },
    });
  }
}
