import handler from '../libs/handler-lib';
import dynamoDb from '../libs/dynamodb-lib';

export const main = handler(async () => {
  const params = { TableName: process.env.tableName };

  let items = [];

  let result;
  do {
    result = await dynamoDb.scan(params);
    result.Items.forEach(item => items.push(item));
    params.ExclusiveStartKey = result.LastEvaluatedKey;
  } while (typeof result.LastEvaluatedKey != 'undefined');

  items.sort((a, b) => b.score - a.score);
  return items;
});
