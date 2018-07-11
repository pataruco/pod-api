const AWS = require("aws-sdk");
const {
  POD_AWS_ACCESS_KEY_ID,
  POD_AWS_SECRET_ACCESS_KEY,
  POD_BUCKET_NAME
} = process.env;

AWS.config.update({
  accessKeyId: POD_AWS_ACCESS_KEY_ID,
  secretAccessKey: POD_AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const params = {
  Bucket: `${POD_BUCKET_NAME}/production/manifest`,
  Key: "manifest.json"
};

const getMAnifest = () => {
  return new Promise((resolve, reject) => {
    s3.getObject(params, (error, data) => {
      if (error) {
        return reject(console.error(error));
      }

      const succcess = () => {
        return JSON.parse(data.Body.toString("utf-8"));
      };

      resolve(succcess());
    });
  });
};

exports.handler = async () => {
  const manifest = await getMAnifest();

  return {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {},
    body: JSON.stringify({
      dates: manifest.dates
    })
  };
};
