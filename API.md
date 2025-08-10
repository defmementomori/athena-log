# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### AthenaTableForAlb <a name="AthenaTableForAlb" id="cdk-athena-log.AthenaTableForAlb"></a>

A CDK construct to create an AWS Glue table for querying ALB access logs with Athena.

It automatically configures partition projection by date, simplifying log analysis.

#### Initializers <a name="Initializers" id="cdk-athena-log.AthenaTableForAlb.Initializer"></a>

```typescript
import { AthenaTableForAlb } from 'cdk-athena-log'

new AthenaTableForAlb(scope: Construct, id: string, props: AthenaTableForAlbProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForAlb.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-athena-log.AthenaTableForAlb.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-athena-log.AthenaTableForAlb.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-athena-log.AthenaTableForAlbProps">AthenaTableForAlbProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-athena-log.AthenaTableForAlb.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-athena-log.AthenaTableForAlb.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-athena-log.AthenaTableForAlb.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-athena-log.AthenaTableForAlbProps">AthenaTableForAlbProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForAlb.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-athena-log.AthenaTableForAlb.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForAlb.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-athena-log.AthenaTableForAlb.isConstruct"></a>

```typescript
import { AthenaTableForAlb } from 'cdk-athena-log'

AthenaTableForAlb.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-athena-log.AthenaTableForAlb.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForAlb.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-athena-log.AthenaTableForAlb.property.table">table</a></code> | <code>aws-cdk-lib.aws_glue.CfnTable</code> | The created Glue Table resource. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-athena-log.AthenaTableForAlb.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `table`<sup>Required</sup> <a name="table" id="cdk-athena-log.AthenaTableForAlb.property.table"></a>

```typescript
public readonly table: CfnTable;
```

- *Type:* aws-cdk-lib.aws_glue.CfnTable

The created Glue Table resource.

---


### AthenaTableForCloudFront <a name="AthenaTableForCloudFront" id="cdk-athena-log.AthenaTableForCloudFront"></a>

Creates a Glue table for querying Parquet-formatted, partitioned CloudFront logs.

NOTE: This construct assumes an ETL process converts raw CloudFront logs into
a partitioned Parquet format in S3.

#### Initializers <a name="Initializers" id="cdk-athena-log.AthenaTableForCloudFront.Initializer"></a>

```typescript
import { AthenaTableForCloudFront } from 'cdk-athena-log'

new AthenaTableForCloudFront(scope: Construct, id: string, props: AthenaTableForCloudFrontProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForCloudFront.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-athena-log.AthenaTableForCloudFront.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-athena-log.AthenaTableForCloudFront.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-athena-log.AthenaTableForCloudFrontProps">AthenaTableForCloudFrontProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-athena-log.AthenaTableForCloudFront.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-athena-log.AthenaTableForCloudFront.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-athena-log.AthenaTableForCloudFront.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-athena-log.AthenaTableForCloudFrontProps">AthenaTableForCloudFrontProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForCloudFront.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-athena-log.AthenaTableForCloudFront.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForCloudFront.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-athena-log.AthenaTableForCloudFront.isConstruct"></a>

```typescript
import { AthenaTableForCloudFront } from 'cdk-athena-log'

AthenaTableForCloudFront.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-athena-log.AthenaTableForCloudFront.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForCloudFront.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-athena-log.AthenaTableForCloudFront.property.table">table</a></code> | <code>aws-cdk-lib.aws_glue.CfnTable</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-athena-log.AthenaTableForCloudFront.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `table`<sup>Required</sup> <a name="table" id="cdk-athena-log.AthenaTableForCloudFront.property.table"></a>

```typescript
public readonly table: CfnTable;
```

- *Type:* aws-cdk-lib.aws_glue.CfnTable

---


### AthenaTableForVpcFlowLog <a name="AthenaTableForVpcFlowLog" id="cdk-athena-log.AthenaTableForVpcFlowLog"></a>

A CDK construct to create an AWS Glue table for querying VPC Flow Logs with Athena.

NOTE: This table requires you to run `MSCK REPAIR TABLE` to discover new partitions.

#### Initializers <a name="Initializers" id="cdk-athena-log.AthenaTableForVpcFlowLog.Initializer"></a>

```typescript
import { AthenaTableForVpcFlowLog } from 'cdk-athena-log'

new AthenaTableForVpcFlowLog(scope: Construct, id: string, props: AthenaTableForVpcFlowLogProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForVpcFlowLog.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-athena-log.AthenaTableForVpcFlowLog.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-athena-log.AthenaTableForVpcFlowLog.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-athena-log.AthenaTableForVpcFlowLogProps">AthenaTableForVpcFlowLogProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-athena-log.AthenaTableForVpcFlowLog.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-athena-log.AthenaTableForVpcFlowLog.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-athena-log.AthenaTableForVpcFlowLog.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-athena-log.AthenaTableForVpcFlowLogProps">AthenaTableForVpcFlowLogProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForVpcFlowLog.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-athena-log.AthenaTableForVpcFlowLog.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForVpcFlowLog.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-athena-log.AthenaTableForVpcFlowLog.isConstruct"></a>

```typescript
import { AthenaTableForVpcFlowLog } from 'cdk-athena-log'

AthenaTableForVpcFlowLog.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-athena-log.AthenaTableForVpcFlowLog.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForVpcFlowLog.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-athena-log.AthenaTableForVpcFlowLog.property.table">table</a></code> | <code>aws-cdk-lib.aws_glue.CfnTable</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-athena-log.AthenaTableForVpcFlowLog.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `table`<sup>Required</sup> <a name="table" id="cdk-athena-log.AthenaTableForVpcFlowLog.property.table"></a>

```typescript
public readonly table: CfnTable;
```

- *Type:* aws-cdk-lib.aws_glue.CfnTable

---


### AthenaTableForWaf <a name="AthenaTableForWaf" id="cdk-athena-log.AthenaTableForWaf"></a>

S3に保存されたAWS WAFログをクエリするためのGlueテーブルを作成します。 このコンストラクトは、公式ドキュメントのdate型パーティション射影に準拠します。.

#### Initializers <a name="Initializers" id="cdk-athena-log.AthenaTableForWaf.Initializer"></a>

```typescript
import { AthenaTableForWaf } from 'cdk-athena-log'

new AthenaTableForWaf(scope: Construct, id: string, props: AthenaTableForWafProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForWaf.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-athena-log.AthenaTableForWaf.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-athena-log.AthenaTableForWaf.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-athena-log.AthenaTableForWafProps">AthenaTableForWafProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-athena-log.AthenaTableForWaf.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-athena-log.AthenaTableForWaf.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-athena-log.AthenaTableForWaf.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-athena-log.AthenaTableForWafProps">AthenaTableForWafProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForWaf.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-athena-log.AthenaTableForWaf.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForWaf.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-athena-log.AthenaTableForWaf.isConstruct"></a>

```typescript
import { AthenaTableForWaf } from 'cdk-athena-log'

AthenaTableForWaf.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-athena-log.AthenaTableForWaf.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForWaf.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-athena-log.AthenaTableForWaf.property.table">table</a></code> | <code>aws-cdk-lib.aws_glue.CfnTable</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-athena-log.AthenaTableForWaf.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `table`<sup>Required</sup> <a name="table" id="cdk-athena-log.AthenaTableForWaf.property.table"></a>

```typescript
public readonly table: CfnTable;
```

- *Type:* aws-cdk-lib.aws_glue.CfnTable

---


## Structs <a name="Structs" id="Structs"></a>

### AthenaTableForAlbProps <a name="AthenaTableForAlbProps" id="cdk-athena-log.AthenaTableForAlbProps"></a>

Properties for the AthenaTableForAlb construct.

#### Initializer <a name="Initializer" id="cdk-athena-log.AthenaTableForAlbProps.Initializer"></a>

```typescript
import { AthenaTableForAlbProps } from 'cdk-athena-log'

const athenaTableForAlbProps: AthenaTableForAlbProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForAlbProps.property.databaseName">databaseName</a></code> | <code>string</code> | The name of the Glue database where the table will be created. |
| <code><a href="#cdk-athena-log.AthenaTableForAlbProps.property.logBucketName">logBucketName</a></code> | <code>string</code> | The name of the S3 bucket where the ALB access logs are stored. |
| <code><a href="#cdk-athena-log.AthenaTableForAlbProps.property.projectionStartDate">projectionStartDate</a></code> | <code>string</code> | The start date for the partition projection. |
| <code><a href="#cdk-athena-log.AthenaTableForAlbProps.property.tableName">tableName</a></code> | <code>string</code> | The name for the Glue table. |
| <code><a href="#cdk-athena-log.AthenaTableForAlbProps.property.logPrefix">logPrefix</a></code> | <code>string</code> | The prefix where ALB access logs are stored within the bucket. |

---

##### `databaseName`<sup>Required</sup> <a name="databaseName" id="cdk-athena-log.AthenaTableForAlbProps.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

The name of the Glue database where the table will be created.

The user is responsible for ensuring this database exists.

---

##### `logBucketName`<sup>Required</sup> <a name="logBucketName" id="cdk-athena-log.AthenaTableForAlbProps.property.logBucketName"></a>

```typescript
public readonly logBucketName: string;
```

- *Type:* string

The name of the S3 bucket where the ALB access logs are stored.

---

##### `projectionStartDate`<sup>Required</sup> <a name="projectionStartDate" id="cdk-athena-log.AthenaTableForAlbProps.property.projectionStartDate"></a>

```typescript
public readonly projectionStartDate: string;
```

- *Type:* string

The start date for the partition projection.

You must provide a value in 'YYYY/MM/DD' format.

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-athena-log.AthenaTableForAlbProps.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

The name for the Glue table.

---

##### `logPrefix`<sup>Optional</sup> <a name="logPrefix" id="cdk-athena-log.AthenaTableForAlbProps.property.logPrefix"></a>

```typescript
public readonly logPrefix: string;
```

- *Type:* string
- *Default:* Logs are expected at the root level (`s3://bucket-name/AWSLogs/...`).

The prefix where ALB access logs are stored within the bucket.

e.g., if logs are at `s3://my-bucket/my-prefix/AWSLogs/...`, specify 'my-prefix'.

---

### AthenaTableForCloudFrontProps <a name="AthenaTableForCloudFrontProps" id="cdk-athena-log.AthenaTableForCloudFrontProps"></a>

#### Initializer <a name="Initializer" id="cdk-athena-log.AthenaTableForCloudFrontProps.Initializer"></a>

```typescript
import { AthenaTableForCloudFrontProps } from 'cdk-athena-log'

const athenaTableForCloudFrontProps: AthenaTableForCloudFrontProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForCloudFrontProps.property.databaseName">databaseName</a></code> | <code>string</code> | The name of the Glue database for this table. |
| <code><a href="#cdk-athena-log.AthenaTableForCloudFrontProps.property.logBucketName">logBucketName</a></code> | <code>string</code> | The name of the S3 bucket where the processed, Parquet-formatted CloudFront logs are stored. |
| <code><a href="#cdk-athena-log.AthenaTableForCloudFrontProps.property.projectionStartDate">projectionStartDate</a></code> | <code>string</code> | The start date for the partition projection, in 'YYYY/MM/DD' format. |
| <code><a href="#cdk-athena-log.AthenaTableForCloudFrontProps.property.tableName">tableName</a></code> | <code>string</code> | The name for the Glue table. |
| <code><a href="#cdk-athena-log.AthenaTableForCloudFrontProps.property.logPrefix">logPrefix</a></code> | <code>string</code> | The prefix within the S3 bucket where the partitioned Parquet files are located. |

---

##### `databaseName`<sup>Required</sup> <a name="databaseName" id="cdk-athena-log.AthenaTableForCloudFrontProps.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

The name of the Glue database for this table.

---

##### `logBucketName`<sup>Required</sup> <a name="logBucketName" id="cdk-athena-log.AthenaTableForCloudFrontProps.property.logBucketName"></a>

```typescript
public readonly logBucketName: string;
```

- *Type:* string

The name of the S3 bucket where the processed, Parquet-formatted CloudFront logs are stored.

---

##### `projectionStartDate`<sup>Required</sup> <a name="projectionStartDate" id="cdk-athena-log.AthenaTableForCloudFrontProps.property.projectionStartDate"></a>

```typescript
public readonly projectionStartDate: string;
```

- *Type:* string

The start date for the partition projection, in 'YYYY/MM/DD' format.

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-athena-log.AthenaTableForCloudFrontProps.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

The name for the Glue table.

---

##### `logPrefix`<sup>Optional</sup> <a name="logPrefix" id="cdk-athena-log.AthenaTableForCloudFrontProps.property.logPrefix"></a>

```typescript
public readonly logPrefix: string;
```

- *Type:* string
- *Default:* No prefix is used.

The prefix within the S3 bucket where the partitioned Parquet files are located.

e.g., `s3://your-bucket/my-parquet-prefix/year=...`

---

### AthenaTableForVpcFlowLogProps <a name="AthenaTableForVpcFlowLogProps" id="cdk-athena-log.AthenaTableForVpcFlowLogProps"></a>

Properties for the AthenaTableForVpcFlowLog construct.

#### Initializer <a name="Initializer" id="cdk-athena-log.AthenaTableForVpcFlowLogProps.Initializer"></a>

```typescript
import { AthenaTableForVpcFlowLogProps } from 'cdk-athena-log'

const athenaTableForVpcFlowLogProps: AthenaTableForVpcFlowLogProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForVpcFlowLogProps.property.databaseName">databaseName</a></code> | <code>string</code> | The name of the Glue database where the table will be created. |
| <code><a href="#cdk-athena-log.AthenaTableForVpcFlowLogProps.property.logBucketName">logBucketName</a></code> | <code>string</code> | The name of the S3 bucket where the VPC Flow Logs are stored. |
| <code><a href="#cdk-athena-log.AthenaTableForVpcFlowLogProps.property.logPrefix">logPrefix</a></code> | <code>string</code> | The prefix within the S3 bucket where logs are located. |
| <code><a href="#cdk-athena-log.AthenaTableForVpcFlowLogProps.property.tableName">tableName</a></code> | <code>string</code> | The name for the Glue table. |

---

##### `databaseName`<sup>Required</sup> <a name="databaseName" id="cdk-athena-log.AthenaTableForVpcFlowLogProps.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

The name of the Glue database where the table will be created.

---

##### `logBucketName`<sup>Required</sup> <a name="logBucketName" id="cdk-athena-log.AthenaTableForVpcFlowLogProps.property.logBucketName"></a>

```typescript
public readonly logBucketName: string;
```

- *Type:* string

The name of the S3 bucket where the VPC Flow Logs are stored.

---

##### `logPrefix`<sup>Required</sup> <a name="logPrefix" id="cdk-athena-log.AthenaTableForVpcFlowLogProps.property.logPrefix"></a>

```typescript
public readonly logPrefix: string;
```

- *Type:* string

The prefix within the S3 bucket where logs are located.

Based on your code, this should be 'flowLog'.

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-athena-log.AthenaTableForVpcFlowLogProps.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

The name for the Glue table.

---

### AthenaTableForWafProps <a name="AthenaTableForWafProps" id="cdk-athena-log.AthenaTableForWafProps"></a>

#### Initializer <a name="Initializer" id="cdk-athena-log.AthenaTableForWafProps.Initializer"></a>

```typescript
import { AthenaTableForWafProps } from 'cdk-athena-log'

const athenaTableForWafProps: AthenaTableForWafProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-athena-log.AthenaTableForWafProps.property.databaseName">databaseName</a></code> | <code>string</code> | Glueデータベース名. |
| <code><a href="#cdk-athena-log.AthenaTableForWafProps.property.logBucketName">logBucketName</a></code> | <code>string</code> | S3に保存されたWAFログのバケット名. |
| <code><a href="#cdk-athena-log.AthenaTableForWafProps.property.tableName">tableName</a></code> | <code>string</code> | 作成するGlueテーブル名. |
| <code><a href="#cdk-athena-log.AthenaTableForWafProps.property.wafScope">wafScope</a></code> | <code>string</code> | WAFのスコープを指定します。 'REGIONAL' または 'CLOUDFRONT'. |
| <code><a href="#cdk-athena-log.AthenaTableForWafProps.property.webAclName">webAclName</a></code> | <code>string</code> | クエリ対象のWeb ACL名. |
| <code><a href="#cdk-athena-log.AthenaTableForWafProps.property.logPrefix">logPrefix</a></code> | <code>string</code> | バケット内のオプションのプレフィックス. |

---

##### `databaseName`<sup>Required</sup> <a name="databaseName" id="cdk-athena-log.AthenaTableForWafProps.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

Glueデータベース名.

---

##### `logBucketName`<sup>Required</sup> <a name="logBucketName" id="cdk-athena-log.AthenaTableForWafProps.property.logBucketName"></a>

```typescript
public readonly logBucketName: string;
```

- *Type:* string

S3に保存されたWAFログのバケット名.

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-athena-log.AthenaTableForWafProps.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

作成するGlueテーブル名.

---

##### `wafScope`<sup>Required</sup> <a name="wafScope" id="cdk-athena-log.AthenaTableForWafProps.property.wafScope"></a>

```typescript
public readonly wafScope: string;
```

- *Type:* string

WAFのスコープを指定します。 'REGIONAL' または 'CLOUDFRONT'.

---

##### `webAclName`<sup>Required</sup> <a name="webAclName" id="cdk-athena-log.AthenaTableForWafProps.property.webAclName"></a>

```typescript
public readonly webAclName: string;
```

- *Type:* string

クエリ対象のWeb ACL名.

---

##### `logPrefix`<sup>Optional</sup> <a name="logPrefix" id="cdk-athena-log.AthenaTableForWafProps.property.logPrefix"></a>

```typescript
public readonly logPrefix: string;
```

- *Type:* string

バケット内のオプションのプレフィックス.

---



