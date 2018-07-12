const AWS = require("aws-sdk");
const { POD_BUCKET_NAME, POD_URL } = process.env;

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

const getFile = (date, fileId) => {
  if (date.length > 0) {
    const index = parseInt(fileId, 10) - 1;
    const imagePath = POD_URL + date[0].files[index].url;
    return imagePath;
  }

  return {
    message: "Date not found"
  };
};

exports.handler = async event => {
  const { dateId, fileId } = event.pathParameters;
  const manifest = await getMAnifest();
  const date = getDate(manifest, dateId);
  const isDateString = dateregex.test(dateId);

  const file = getFile(date, fileId);
  const isdateIdANumber = Number.isInteger(parseInt(fileId, 10));

  if (isDateString && date.length > 0 && isdateIdANumber) {
    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body: JSON.stringify(file)
    };
  }

  if (isDateString && date.length === 0) {
    return {
      isBase64Encoded: false,
      statusCode: 204,
      headers: {},
      body: JSON.stringify(file)
    };
  }
};
