# CDK Constructs for Log Analysis with Athena

[![NPM version](https://img.shields.io/npm/v/cdk-athena-log.svg)](https://www.npmjs.com/package/cdk-athena-log)
[![PyPI version](https://img.shields.io/pypi/v/cdk-athena-log.svg)](https://pypi.org/project/cdk-athena-log)
[![View on Construct Hub](https://constructs.dev/badge?package=cdk-athena-log)](https://constructs.dev/packages/cdk-athena-log)

This AWS CDK library provides a collection of ready-to-use constructs to create AWS Glue tables for various AWS service logs, making them queryable with Amazon Athena.

This library simplifies the setup of schemas, SerDes, and partition projection, allowing you to focus on analyzing your data, not on boilerplate table definitions.

---

## Available Constructs

This library currently supports the following log types, with more planned for the future.

* ✅ **Application Load Balancer (ALB)**
* 🔜 **CloudFront** (Coming soon)
* 🔜 **VPC Flow Logs** (Coming soon)

---

## Installation

```bash
# npm
npm install cdk-athena-log

# yarn
yarn add cdk-athena-log

# pnpm
pnpm add cdk-athena-log

# pip (Python)
pip install cdk-athena-log
```

---

## Usage 🚀

Import the specific construct you need and use it in your CDK stack. You are responsible for ensuring that the specified S3 bucket and Glue database exist.

### For Application Load Balancer (ALB) Logs

```typescript
import { AthenaTableForAlb } from 'cdk-athena-log';

const alb = new elbv2.ApplicationLoadBalancer(this, 'MyAlb', {
      vpc,
      internetFacing: true,
    });
new AthenaTableForAlb(this, 'AlbLogsAthenaTable', {
    logBucketName: logBucket.bucketName,
    databaseName: 'my_app_analytics_db', 
    tableName: 'alb_access_logs',
    projectionStartDate: '2025/08/01',
});
```

---

## API Reference

### AthenaTableForAlb

| Prop Name             | Type     | Required | Description                                                                                                                              |
| --------------------- | :------- | :------: | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `logBucketName`       | `string` |    ✅    | The name of the S3 bucket where your ALB logs are stored.                                                                                |
| `databaseName`        | `string` |    ✅    | The name of the Glue database where the table will be created. You must ensure this database exists.                                      |
| `tableName`           | `string` |    ✅    | The name of the table to be created in Athena.                                                                                           |
| `projectionStartDate` | `string` |    ✅    | The start date for partition projection, in `YYYY/MM/DD` format.                                                                         |
| `logPrefix