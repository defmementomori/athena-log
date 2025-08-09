import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'defmementomori',
  authorAddress: 'defmementomori@gmail.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.8.0',
  name: 'athena-log',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/defmementomori/athena-log.git',
  // 以下はConstruct Hubでの見つけやすさのために重要
  description: 'A CDK construct to create an Athena table for querying ALB logs.',
  keywords: ['aws', 'cdk', 'athena', 'alb', 'logs', 'glue'],
});
project.synth();
