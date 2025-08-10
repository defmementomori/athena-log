
# Athena Log Constructs for AWS CDK

[![NPM version](https://img.shields.io/npm/v/cdk-athena-log.svg)](https://www.npmjs.com/package/cdk-athena-log)
[![PyPI version](https://img.shields.io/pypi/v/cdk-athena-log.svg)](https://pypi.org/project/cdk-athena-log)
[![View on Construct Hub](https://constructs.dev/badge?package=cdk-athena-log)](https://constructs.dev/packages/cdk-athena-log)

This AWS CDK library provides a collection of ready-to-use constructs to create AWS Glue tables for various AWS service logs, making them queryable with Amazon Athena.

This library simplifies the setup of schemas, SerDes, and partition settings, allowing you to focus on analyzing your data, not on boilerplate table definitions.

---

## Available Constructs 🧰

This library currently supports the following log types:

* **Application Load Balancer (ALB)** - Uses Partition Projection (maintenance-free).
* **AWS WAF** - Uses Partition Projection for JSON logs (maintenance-free).
* **VPC Flow Logs** - Requires `MSCK REPAIR TABLE` for partition updates.

---

## Installation 📦

```bash
# pnpm
pnpm add cdk-athena-log

# npm
npm install cdk-athena-log

# yarn
yarn add cdk-athena-log
````

-----

## Usage 🚀

Import the specific construct you need and use it in your CDK stack.

### For Application Load Balancer (ALB) Logs

This construct uses **Partition Projection**, so you don't need to manually update partitions.

```typescript
import { AthenaTableForAlb } from 'cdk-athena-log';

new AthenaTableForAlb(this, 'AlbLogsAthenaTable', {
  logBucketName: 'my-alb-access-logs-bucket',
  databaseName: 'analytics_db',
  tableName: 'alb_access_logs',
  projectionStartDate: '2025/01/01',
});
```

### For AWS WAF Logs

This construct also uses **Partition Projection** and is designed for JSON-formatted WAF logs.

```typescript
import { AthenaTableForWaf } from 'cdk-athena-log';

new AthenaTableForWaf(this, 'WafLogsAthenaTable', {
  logBucketName: 'my-waf-access-logs-bucket',
  databaseName: 'analytics_db',
  tableName: 'waf_access_logs',
  projectionStartDate: '2025/01/01',
});
```

### For VPC Flow Logs

> **⚠️ Important Note**
> This table does **not** use partition projection. You must run `MSCK REPAIR TABLE your_vpc_table_name;` in the Athena query editor to discover new log partitions before you can query them.

```typescript
import { AthenaTableForVpcFlowLog } from 'cdk-athena-log';

new AthenaTableForVpcFlowLog(this, 'VpcFlowLogsAthenaTable', {
  logBucketName: 'my-vpc-flow-logs-bucket',
  databaseName: 'analytics_db',
  tableName: 'vpc_flow_logs',
  logPrefix: 'flowLog', // Example prefix
});
```

-----

## API Reference 📖

### `AthenaTableForAlb`

| Prop Name             | Type     | Required | Description                                                                    |
| --------------------- | -------- | -------- | ------------------------------------------------------------------------------ |
| `logBucketName`       | `string` | Yes      | The name of the S3 bucket where your ALB logs are stored.                      |
| `databaseName`        | `string` | Yes      | The name of the Glue database where the table will be created.                 |
| `tableName`           | `string` | Yes      | The name of the table to be created in Athena.                                 |
| `projectionStartDate` | `string` | Yes      | The start date for partition projection, in `YYYY/MM/DD` format.               |
| `logPrefix`           | `string` | No       | (Optional) The prefix within the S3 bucket where logs are located.             |

### `AthenaTableForWaf`

| Prop Name             | Type     | Required | Description                                                                    |
| --------------------- | -------- | -------- | ------------------------------------------------------------------------------ |
| `logBucketName`       | `string` | Yes      | The name of the S3 bucket where your WAF logs are stored.                      |
| `databaseName`        | `string` | Yes      | The name of the Glue database where the table will be created.                 |
| `tableName`           | `string` | Yes      | The name of the table to be created in Athena.                                 |
| `projectionStartDate` | `string` | Yes      | The start date for partition projection, in `YYYY/MM/DD` format.               |
| `logPrefix`           | `string` | No       | (Optional) The prefix within the S3 bucket where logs are located.             |

### `AthenaTableForVpcFlowLog`

| Prop Name       | Type     | Required | Description                                                                    |
| --------------- | -------- | -------- | ------------------------------------------------------------------------------ |
| `logBucketName` | `string` | Yes      | The name of the S3 bucket where your VPC Flow Logs are stored.                 |
| `databaseName`  | `string` | Yes      | The name of the Glue database where the table will be created.                 |
| `tableName`     | `string` | Yes      | The name of the table to be created in Athena.                                 |
| `logPrefix`     | `string` | Yes      | The prefix within the S3 bucket where logs are located (e.g., `'flowLog'`).    |

-----

## Contributing 🤝

Contributions are welcome\! Please open an issue or submit a pull request.

## License 📄

This project is licensed under the Apache-2.0 License.

