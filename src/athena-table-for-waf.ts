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
   * WAFのスコープを指定します。
   * 'REGIONAL' または 'CLOUDFRONT'
   */
  readonly wafScope: 'REGIONAL' | 'CLOUDFRONT';
  /** クエリ対象のWeb ACL名 */
  readonly webAclName: string;
  /** バケット内のオプションのプレフィックス */
  readonly logPrefix?: string;
}

/**
 * S3に保存されたAWS WAFログをクエリするためのGlueテーブルを作成します。
 * このコンストラクトは、公式ドキュメントのdate型パーティション射影に準拠します。
 */
export class AthenaTableForWaf extends Construct {
  public readonly table: glue.CfnTable;

  constructor(scope: Construct, id: string, props: AthenaTableForWafProps) {
    super(scope, id);

    const { logBucketName, databaseName, tableName, wafScope, webAclName, logPrefix } = props;

    const stack = Stack.of(this);
    const account = stack.account;

    const logRegion = wafScope === 'CLOUDFRONT' ? 'cloudfront' : stack.region;

    const s3Prefix = logPrefix ? `${logPrefix}/` : '';
    const s3BaseLocation = `s3://${logBucketName}/${s3Prefix}AWSLogs/${account}/WAFLogs/${logRegion}/${webAclName}/`;
    const s3LocationTemplate = `${s3BaseLocation}\${log_time}`;

    this.table = new glue.CfnTable(this, 'Default', {
      catalogId: account,
      databaseName: databaseName,
      tableInput: {
        name: tableName,
        tableType: 'EXTERNAL_TABLE',
        parameters: {
          'projection.enabled': 'true',
          'projection.log_time.type': 'date',
          'projection.log_time.format': 'yyyy/MM/dd/HH/mm',
          'projection.log_time.range': '2025/01/01/00/00,NOW',
          'projection.log_time.interval': '1',
          'projection.log_time.interval.unit': 'MINUTES',
          'storage.location.template': s3LocationTemplate,
        },
        partitionKeys: [{ name: 'log_time', type: 'string' }],
        storageDescriptor: {
          columns: [
            { name: 'timestamp', type: 'bigint' },
            { name: 'formatversion', type: 'int' },
            { name: 'webaclid', type: 'string' },
            { name: 'terminatingruleid', type: 'string' },
            { name: 'terminatingruletype', type: 'string' },
            { name: 'action', type: 'string' },
            { name: 'terminatingrulematchdetails', type: 'array<struct<conditiontype:string,sensitivitylevel:string,location:string,matcheddata:array<string>>>' },
            { name: 'httpsourcename', type: 'string' },
            { name: 'httpsourceid', type: 'string' },
            {
              name: 'rulegrouplist',
              type: 'array<struct<rulegroupid:string,terminatingrule:struct<ruleid:string,action:string,rulematchdetails:array<struct<conditiontype:string,sensitivitylevel:string,location:string,matcheddata:array<string>>>>,nonterminatingmatchingrules:array<struct<ruleid:string,action:string,overriddenaction:string,rulematchdetails:array<struct<conditiontype:string,sensitivitylevel:string,location:string,matcheddata:array<string>>>,challengeresponse:struct<responsecode:string,solvetimestamp:string>,captcharesponse:struct<responsecode:string,solvetimestamp:string>>>,excludedrules:string>>',
            },
            { name: 'ratebasedrulelist', type: 'array<struct<ratebasedruleid:string,limitkey:string,maxrateallowed:int>>' },
            {
              name: 'nonterminatingmatchingrules',
              type: 'array<struct<ruleid:string,action:string,rulematchdetails:array<struct<conditiontype:string,sensitivitylevel:string,location:string,matcheddata:array<string>>>,challengeresponse:struct<responsecode:string,solvetimestamp:string>,captcharesponse:struct<responsecode:string,solvetimestamp:string>>',
            },
            { name: 'requestheadersinserted', type: 'array<struct<name:string,value:string>>' },
            { name: 'responsecodesent', type: 'string' },
            {
              name: 'httprequest',
              type: 'struct<clientip:string,country:string,headers:array<struct<name:string,value:string>>,uri:string,args:string,httpversion:string,httpmethod:string,requestid:string,fragment:string,scheme:string,host:string>',
            },
            { name: 'labels', type: 'array<struct<name:string>>' },
            { name: 'captcharesponse', type: 'struct<responsecode:string,solvetimestamp:string,failurereason:string>' },
            { name: 'challengeresponse', type: 'struct<responsecode:string,solvetimestamp:string,failurereason:string>' },
            { name: 'ja3fingerprint', type: 'string' },
            { name: 'ja4fingerprint', type: 'string' },
            { name: 'oversizefields', type: 'string' },
            { name: 'requestbodysize', type: 'int' },
            { name: 'requestbodysizeinspectedbywaf', type: 'int' },
          ],
          location: s3BaseLocation,
          serdeInfo: {
            serializationLibrary: 'org.openx.data.jsonserde.JsonSerDe',
          },
        },
      },
    });
  }
}
