const AWS = require("aws-sdk");
const POD_BUCKET_NAME = "peter-of-the-day";

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
  return manifest.dates.filter(date => date.date === dateId)[0];
};

const getFile = (date, fileId) => {
  console.log("date ----------------------");
  console.log(date);
  const index = parseInt(fileId, 10) - 1;
  return date.files[index].url;
};

exports.handler = async event => {
  const { dateId, fileId } = event.pathParameters;
  const manifest = await getMAnifest();
  const date = getDate(manifest, dateId);
  const isDateString = dateregex.test(dateId);

  const file = getFile(date, fileId);
  const isdateIdANumber = Number.isInteger(parseInt(fileId, 10));

  return {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {},
    body: JSON.stringify(file)
  };
};
