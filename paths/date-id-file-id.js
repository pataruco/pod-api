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
  const index = parseInt(fileId, 10) - 1;

  if (date.length > 0) {
    const isFileAvailable = index + 1 <= date[0].files.length;

    if (isFileAvailable) {
      const imagePath = POD_URL + date[0].files[index].url;
      return imagePath;
    }

    if (!isFileAvailable) {
      return {
        message: "File not found"
      };
    }
  }

  if (date.length === 0) {
    return {
      message: "Date not found"
    };
  }
};

exports.handler = async event => {
  const { dateId, fileId } = event.pathParameters;
  const manifest = await getMAnifest();
  const date = getDate(manifest, dateId);
  const isDateString = dateregex.test(dateId);
  const isFileIdANumber = Number.isInteger(parseInt(fileId, 10));

  const file = isFileIdANumber
    ? getFile(date, fileId)
    : { message: "file number should be a number" };

  if (isDateString && date.length > 0 && isFileIdANumber && !file.message) {
    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body: JSON.stringify(file)
    };
  }

  if (isDateString && date.length > 0 && isFileIdANumber && file.message) {
    return {
      isBase64Encoded: false,
      statusCode: 204,
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
