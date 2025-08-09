import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'defmementomori',
  authorAddress: 'defmementomori@gmail.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.8.0',
  name: 'athena-alb-log',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/defmementomori/athena-alb-log.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();