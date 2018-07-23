const AWS = require("aws-sdk");
const { POD_BUCKET_NAME, POD_URL } = process.env;

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

const getPicture = fileName => {
  const pictureParams = {
    Bucket: `${POD_BUCKET_NAME}`,
    Key: fileName
  };
  return new Promise((resolve, reject) => {
    s3.getObject(pictureParams, (error, data) => {
      if (error) {
        return reject(console.error(error));
      }

      const succcess = () => {
        return data.Body.toString("base64");
      };

      resolve(succcess());
    });
  });
};

const getRandomNumber = maxNumber => {
  return Math.floor(Math.random() * maxNumber) + 1;
};

exports.handler = async () => {
  const manifest = await getMAnifest();
  const maxDatesNumber = manifest.dates.length;
  const randomDateNumber = getRandomNumber(maxDatesNumber);
  const randomDate = manifest.dates[randomDateNumber - 1];
  const maxFileNumber = randomDate.files.length;
  const randomFileNumber = getRandomNumber(maxFileNumber);
  const file = randomDate.files[randomFileNumber - 1].url;

  if (file) {
    return {
      isBase64Encoded: true,
      statusCode: 200,
      headers: {
        "Content-type": "image/jpeg"
      },
      body: await getPicture(file)
    };
  }

  return {
    isBase64Encoded: true,
    statusCode: 400,
    headers: {},
    body: JSON.stringify({
      message: "file not found"
    })
  };
};
