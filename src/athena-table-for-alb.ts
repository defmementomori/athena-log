import { aws_glue as glue, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Properties for the AthenaTableForAlb construct.
 */
export interface AthenaTableForAlbProps {
  /**
   * The name of the S3 bucket where the ALB access logs are stored.
   */
  readonly logBucketName: string;

  /**
   * The name of the Glue database where the table will be created.
   * The user is responsible for ensuring this database exists.
   */
  readonly databaseName: string;

  /**
   * The name for the Glue table.
   */
  readonly tableName: string;

  /**
   * The start date for the partition projection.
   * You must provide a value in 'YYYY/MM/DD' format.
   */
  readonly projectionStartDate: string;

  /**
   * The prefix where ALB access logs are stored within the bucket.
   * e.g., if logs are at `s3://my-bucket/my-prefix/AWSLogs/...`, specify 'my-prefix'.
   * @default Logs are expected at the root level (`s3://bucket-name/AWSLogs/...`).
   */
  readonly logPrefix?: string;
}

/**
 * A CDK construct to create an AWS Glue table for querying ALB access logs with Athena.
 * It automatically configures partition projection by date, simplifying log analysis.
 */
export class AthenaTableForAlb extends Construct {
  /**
   * The created Glue Table resource.
   */
  public readonly table: glue.CfnTable;

  constructor(scope: Construct, id: string, props: AthenaTableForAlbProps) {
    super(scope, id);

    const { logBucketName, databaseName, tableName, projectionStartDate, logPrefix } = props;

    // Add a runtime check for all required properties for extra safety.
    if (!logBucketName || !databaseName || !tableName || !projectionStartDate) {
      throw new Error('The `logBucketName`, `databaseName`, `tableName`, and `projectionStartDate` properties are all required.');
    }

    const stack = Stack.of(this);

    // Build the S3 path to the logs dynamically
    const s3LocationPrefix = logPrefix ? `${logPrefix}/` : '';
    const s3Location = `s3://${logBucketName}/${s3LocationPrefix}AWSLogs/${stack.account}/elasticloadbalancing/${stack.region}/`;

    this.table = new glue.CfnTable(this, 'Default', {
      catalogId: stack.account,
      databaseName: databaseName,
      tableInput: {
        name: tableName,
        description: 'Table for querying ALB access logs',
        tableType: 'EXTERNAL_TABLE',
        parameters: {
          'projection.enabled': 'true',
          'projection.day.type': 'date',
          'projection.day.range': `${projectionStartDate},2200`,
          'projection.day.format': 'yyyy/MM/dd',
          'projection.day.interval': '1',
          'projection.day.interval.unit': 'DAYS',
          'storage.location.template': `${s3Location}\${day}/`,
          'EXTERNAL': 'TRUE',
          'has_encrypted_data': 'false',
        },
        partitionKeys: [{ name: 'day', type: 'string' }],
        storageDescriptor: {
          columns: [
            { name: 'type', type: 'string' },
            { name: 'time', type: 'string' },
            { name: 'elb', type: 'string' },
            { name: 'client_ip', type: 'string' },
            { name: 'client_port', type: 'int' },
            { name: 'target_ip', type: 'string' },
            { name: 'target_port', type: 'int' },
            { name: 'request_processing_time', type: 'double' },
            { name: 'target_processing_time', type: 'double' },
            { name: 'response_processing_time', type: 'double' },
            { name: 'elb_status_code', type: 'int' },
            { name: 'target_status_code', type: 'string' },
            { name: 'received_bytes', type: 'bigint' },
            { name: 'sent_bytes', type: 'bigint' },
            { name: 'request_verb', type: 'string' },
            { name: 'request_url', type: 'string' },
            { name: 'request_proto', type: 'string' },
            { name: 'user_agent', type: 'string' },
            { name: 'ssl_cipher', type: 'string' },
            { name: 'ssl_protocol', type: 'string' },
            { name: 'target_group_arn', type: 'string' },
            { name: 'trace_id', type: 'string' },
            { name: 'domain_name', type: 'string' },
            { name: 'chosen_cert_arn', type: 'string' },
            { name: 'matched_rule_priority', type: 'string' },
            { name: 'request_creation_time', type: 'string' },
            { name: 'actions_executed', type: 'string' },
            { name: 'redirect_url', type: 'string' },
            { name: 'lambda_error_reason', type: 'string' },
            { name: 'target_port_list', type: 'string' },
            { name: 'target_status_code_list', type: 'string' },
            { name: 'classification', type: 'string' },
            { name: 'classification_reason', type: 'string' },
            { name: 'conn_trace_id', type: 'string' },
          ],
          location: s3Location,
          inputFormat: 'org.apache.hadoop.mapred.TextInputFormat',
          outputFormat: 'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat',
          serdeInfo: {
            serializationLibrary: 'org.apache.hadoop.hive.serde2.RegexSerDe',
            parameters: {
              'serialization.format': '1',
              'input.regex':
                '([^ ]*) ([^ ]*) ([^ ]*) ([^ ]*):([0-9]*) ([^ ]*)[:-]([0-9]*) ([-.0-9]*) ([-.0-9]*) ([-.0-9]*) (|[-0-9]*) (-|[-0-9]*) ([-0-9]*) ([-0-9]*) "([^ ]*) (.*) (- |[^ ]*)" "([^"]*)" ([A-Z0-9-_]+) ([A-Za-z0-9.-]*) ([^ ]*) "([^"]*)" "([^"]*)" "([^"]*)" ([-.0-9]*) ([^ ]*) "([^"]*)" "([^"]*)" "([^ ]*)" "([^\\s]+?)" "([^\\s]+)" "([^ ]*)" "([^ ]*)" ?([^ ]*)?( .*)?',
            },
          },
          compressed: false,
          storedAsSubDirectories: false,
        },
      },
    });
  }
}
