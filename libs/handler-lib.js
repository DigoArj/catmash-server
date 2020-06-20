export default lambda => (event, context) =>
  Promise.resolve()
    .then(() => lambda(event, context))
    .then(responseBody => [200, responseBody])
    .catch(e => [500, { error: e.message }])
    .then(([statusCode, body]) => ({
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(body),
    }));
