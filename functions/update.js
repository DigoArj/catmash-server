import handler from '../libs/handler-lib';
import dynamoDb from '../libs/dynamodb-lib';

export const main = handler(async event => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Key: {
      catId: event.pathParameters.id,
    },

    UpdateExpression: 'SET score = :score',
    ExpressionAttributeValues: { ':score': data.score || null },
    ReturnValues: 'ALL_NEW',
  };

  const result = await dynamoDb.update(params);

  return { status: 'success', item: result.Attributes };
});
