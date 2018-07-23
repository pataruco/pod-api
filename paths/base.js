const description = {
  description: "An endpoint to collect pictures of Peter Martin Blanco",
  schema: "https://github.com/pataruco/pod-api/blob/master/config/swagger.yaml"
};

exports.handler = () => {
  return {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {},
    body: JSON.stringify(description)
  };
};
