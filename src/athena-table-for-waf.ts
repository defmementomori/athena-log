import { aws_glue as glue, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface AthenaTableForWafProps {
  /** S3に保存されたWAFログのバケット名 */
  readonly logBucketName: string;
  /** Glueデータベース名 */
  readonly databaseName: string;
  /** 作成するGlueテーブル名 */
  readonly tableName: string;
  /**
   * パーティション射影の開始日 (yyyy/MM/dd形式)
   * @example '2025/08/01'
   */
  readonly projectionStartDate: string;
  /**
   * ★ WAFのスコープを指定します。
   * 'REGIONAL' または 'CLOUDFRONT'
   */
  readonly wafScope: 'REGIONAL' | 'CLOUDFRONT';
  /** バケット内のオプションのプレフィックス */
  readonly logPrefix?: string;
}

export class AthenaTableForWaf extends Construct {
  public readonly table: glue.CfnTable;

  constructor(scope: Construct, id: string, props: AthenaTableForWafProps) {
    super(scope, id);

    const { logBucketName, databaseName, tableName, projectionStartDate, logPrefix, wafScope } = props;

    const stack = Stack.of(this);
    const account = stack.account;

    const logRegion = wafScope === 'CLOUDFRONT' ? 'global' : stack.region;

    const s3Prefix = logPrefix ? `${logPrefix}/` : '';
    const s3BaseLocation = `s3://${logBucketName}/${s3Prefix}AWSLogs/`;

    // ★ 決定したlogRegionをテンプレートパスに使用
    const s3LocationTemplate = `${s3BaseLocation}${account}/WAFLogs/${logRegion}/\${webacl}/\${year}/\${month}/\${day}/\${hour}/\${minute}/`;

    this.table = new glue.CfnTable(this, 'Default', {
      catalogId: account,
      databaseName: databaseName,
      tableInput: {
        name: tableName,
        description: 'Table for querying AWS WAF logs with partition projection',
        tableType: 'EXTERNAL_TABLE',
        parameters: {
          'projection.enabled': 'true',
          'projection.webacl.type': 'injected',
          'projection.year.type': 'integer',
          'projection.year.range': `${projectionStartDate.substring(0, 4)},NOW`,
          'projection.month.type': 'integer',
          'projection.month.range': '01,12',
          'projection.day.type': 'integer',
          'projection.day.range': '01,31',
          'projection.hour.type': 'integer',
          'projection.hour.range': '00,23',
          'projection.minute.type': 'integer',
          'projection.minute.range': '00,59',
          'storage.location.template': s3LocationTemplate,
        },
        partitionKeys: [
          { name: 'webacl', type: 'string' },
          { name: 'year', type: 'string' },
          { name: 'month', type: 'string' },
          { name: 'day', type: 'string' },
          { name: 'hour', type: 'string' },
          { name: 'minute', type: 'string' },
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
            { name: 'nonterminatingmatchingrules', type: 'array<struct<ruleid:string,action:string,rulematchdetails:array<struct<conditiontype:string,location:string,matcheddata:array<string>>>>>' },
            { name: 'requestheadersinserted', type: 'array<struct<name:string,value:string>>' },
            { name: 'responsecodesent', type: 'int' },
            { name: 'labels', type: 'array<struct<name:string>>' },
            {
              name: 'httpsys_request',
              type: 'struct<clientip:string,country:string,headers:array<struct<name:string,value:string>>,uri:string,args:string,httpversion:string,httpmethod:string,requestid:string>',
            },
          ],
          location: s3BaseLocation,
          serdeInfo: {
            serializationLibrary: 'org.openx.data.jsonserde.JsonSerDe',
          },
          compressed: false,
        },
      },
    });
  }
}
