import handler from '../libs/handler-lib';
import dynamoDb from '../libs/dynamodb-lib';
import axios from 'axios';

export const main = handler(async () => {
  const cats = await axios
    .get(process.env.catsDataUrl)
    .then(response => response.data['images'])
    .catch(error => console.log(error));

  return Promise.all(cats.map(putItem))
    .then(() => 'success')
    .catch(e => ({ error: e }));
});

const putItem = async ({ id, url }) => {
  const params = {
    TableName: process.env.tableName,
    Item: {
      catId: id,
      imageUrl: url,
      score: 1000,
    },
    ConditionExpression: 'attribute_not_exists(catId)',
  };

  await dynamoDb.put(params);
};
