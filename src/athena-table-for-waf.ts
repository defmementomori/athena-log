import { aws_glue as glue, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface AthenaTableForWafProps {
  readonly logBucketName: string;
  readonly databaseName: string;
  readonly tableName: string;
  readonly projectionStartDate: string;
  readonly logPrefix?: string;
}

/**
 * Creates a Glue table for querying AWS WAF logs stored in S3.
 * This construct uses partition projection and is designed for JSON-formatted WAF logs.
 */
export class AthenaTableForWaf extends Construct {
  public readonly table: glue.CfnTable;

  constructor(scope: Construct, id: string, props: AthenaTableForWafProps) {
    super(scope, id);

    const { logBucketName, databaseName, tableName, projectionStartDate, logPrefix } = props;

    const stack = Stack.of(this);
    const account = stack.account;
    const region = stack.region;

    const s3LocationPrefix = logPrefix ? `${logPrefix}/` : '';
    const s3LocationTemplate = `s3://${logBucketName}/${s3LocationPrefix}aws-waf-logs/${account}/webacl/*/${region}/\${year}/\${month}/\${day}/\${hour}/`;
    const s3BaseLocation = `s3://${logBucketName}/${s3LocationPrefix}aws-waf-logs/`;

    this.table = new glue.CfnTable(this, 'Default', {
      catalogId: account,
      databaseName: databaseName,
      tableInput: {
        name: tableName,
        description: 'Table for querying AWS WAF logs',
        tableType: 'EXTERNAL_TABLE',
        parameters: {
          'projection.enabled': 'true',
          'projection.year.type': 'integer',
          'projection.year.range': projectionStartDate.substring(0, 4) + ',NOW',
          'projection.month.type': 'integer',
          'projection.month.range': '01,12',
          'projection.day.type': 'integer',
          'projection.day.range': '01,31',
          'projection.hour.type': 'integer',
          'projection.hour.range': '00,23',
          'storage.location.template': s3LocationTemplate,
        },
        partitionKeys: [
          { name: 'year', type: 'string' },
          { name: 'month', type: 'string' },
          { name: 'day', type: 'string' },
          { name: 'hour', type: 'string' },
        ],
        storageDescriptor: {
          columns: [
            { name: 'timestamp', type: 'bigint' },
            { name: 'formatversion', type: 'int' },
            { name: 'webaclid', type: 'string' },
            { name: 'terminatingruleid', type: 'string' },
            { name: 'terminatingruletype', type: 'string' },
            { name: 'action', type: 'string' },
            { name: 'terminatingrulematchdetails', type: 'array<struct<conditiontype:string,location:string,matcheddata:array<string>>>' },
            {
              name: 'httpsys_request',
              type: 'struct<clientip:string,country:string,headers:array<struct<name:string,value:string>>,uri:string,args:string,httpversion:string,httpmethod:string,requestid:string>',
            },
            { name: 'nonterminatingmatchingrules', type: 'array<struct<ruleid:string,action:string,rulematchdetails:array<struct<conditiontype:string,location:string,matcheddata:array<string>>>>>' },
            { name: 'requestheadersinserted', type: 'array<struct<name:string,value:string>>' },
            { name: 'responsecodesent', type: 'int' },
            { name: 'labels', type: 'array<struct<name:string>>' },
          ],
          location: s3BaseLocation,
          // SerDe for JSON format
          serdeInfo: {
            serializationLibrary: 'org.openx.data.jsonserde.JsonSerDe',
          },
          compressed: false,
        },
      },
    });
  }
}
