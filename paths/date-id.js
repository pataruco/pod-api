const AWS = require("aws-sdk");
const { POD_BUCKET_NAME } = process.env;

const s3 = new AWS.S3();

const params = {
  Bucket: `${POD_BUCKET_NAME}/production/manifest`,
  Key: "manifest.json"
};

const dateregex = /^\d{4}-\d{2}-\d{2}$/;

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

  if (isDateString && date.length > 0) {
    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body: JSON.stringify(...date)
    };
  }

  if (isDateString && date.length === 0) {
    return {
      isBase64Encoded: false,
      statusCode: 204,
      headers: {},
      body: JSON.stringify({
        message: "Date not found"
      })
    };
  }

  if (!isDateString) {
    return {
      isBase64Encoded: false,
      statusCode: 400,
      headers: {},
      body: JSON.stringify({
        message: "date format should be ISO"
      })
    };
  }
};
