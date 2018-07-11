const AWS = require('aws-sdk');
const POD_BUCKET_NAME = 'peter-of-the-day';

const s3 = new AWS.S3();

const params = {
  Bucket: `${POD_BUCKET_NAME}/production/manifest`,
  Key: 'manifest.json',
};

const getMAnifest = () => {
  return new Promise((resolve, reject) => {
    s3.getObject(params, (error, data) => {
      if (error) {
        return reject(console.error(error));
      }

      const succcess = () => {
        return JSON.parse(data.Body.toString('utf-8'));
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
      dates: manifest.dates,
    }),
  };
};
