import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'defmementomori',
  authorAddress: 'defmementomori@gmail.com',
  cdkVersion: '2.147.3',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.8.0',
  name: 'cdk-athena-log',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/defmementomori/athena-log.git',
  description: 'A CDK construct to create an Athena table for querying ALB logs.',
  keywords: ['aws', 'cdk', 'athena', 'alb', 'logs', 'glue'],
  packageManager: javascript.NodePackageManager.PNPM,
});
project.synth();
