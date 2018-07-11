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

const dateregex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/gm;

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

const getDate = (manifest, dateId) => {
  return manifest.dates.filter(date => date.date === dateId);
};

exports.handler = async event => {
  const dateId = event.pathParameters.dateId;
  const manifest = await getMAnifest();
  const date = getDate(manifest, dateId);
  const isDateString = dateregex.test(dateId);

  if (isDateString) {
    if (date.length > 0) {
      return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {},
        body: JSON.stringify({
          date
        })
      };
    }

    return {
      isBase64Encoded: false,
      statusCode: 204,
      headers: {},
      body: JSON.stringify({
        date
      })
    };
  }

  return {
    isBase64Encoded: false,
    statusCode: 400,
    headers: {},
    body: JSON.stringify({
      message: "date format should be ISO"
    })
  };
};
