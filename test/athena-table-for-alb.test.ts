import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AthenaTableForAlb } from '../src/index';

// AthenaTableForAlb Constructのテスト
test('Snapshot Test for AthenaTableForAlb', () => {
  // GIVEN (前提条件): テスト用のStackを準備
  const stack = new Stack();

  // WHEN (実行): 作成したConstructをインスタンス化
  new AthenaTableForAlb(stack, 'MyTestTable', {
    logBucketName: 'test-log-bucket',
    databaseName: 'test_database',
    tableName: 'test_table',
    projectionStartDate: '2025-08-01',
  });

  // THEN (検証): 生成されたCloudFormationテンプレートが期待通りか確認
  const template = Template.fromStack(stack);

  // 生成されたテンプレートが、保存されたスナップショットと一致するか検証
  expect(template.toJSON()).toMatchSnapshot();
});
