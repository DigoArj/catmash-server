import handler from '../libs/handler-lib';
import dynamoDb from '../libs/dynamodb-lib';

export const main = handler(async event => {
  const params = {
    TableName: process.env.tableName,
    Key: { catId: event.pathParameters.id },
  };

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error('Cat not found.');
  }

  return result.Item;
});
