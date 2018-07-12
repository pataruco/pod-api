const { handler } = require("../paths/date-id-file-id");
const { POD_URL } = process.env;

describe("/date/dateId/fileId", () => {
  describe("200", () => {
    it("should return 200", async () => {
      const event200 = {
        pathParameters: {
          dateId: "2017-01-25",
          fileId: "1"
        }
      };

      const bodyResponse = POD_URL + "production/2017-01-25_2.jpeg";

      const response = {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {},
        body: JSON.stringify(bodyResponse)
      };

      expect(await handler(event200)).toEqual(response);
    });
  });

  describe("204", () => {
    it("should return 204 when date is not available", async () => {
      const event204 = {
        pathParameters: {
          dateId: "2012-01-25",
          fileId: "1"
        }
      };

      const bodyResponse = {
        message: "Date not found"
      };

      const response = {
        isBase64Encoded: false,
        statusCode: 204,
        headers: {},
        body: JSON.stringify(bodyResponse)
      };

      expect(await handler(event204)).toEqual(response);
    });

    // it("should return 204 when date is not available", async () => {
    //   const event204 = {
    //     pathParameters: {
    //       dateId: "2017-01-25",
    //       fileId: "9"
    //     }
    //   };

    //   const bodyResponse = {
    //     message: "File not found"
    //   };

    //   const response = {
    //     isBase64Encoded: false,
    //     statusCode: 204,
    //     headers: {},
    //     body: JSON.stringify(bodyResponse)
    //   };

    //   expect(await handler(event204)).toEqual(response);
    // });
  });
});
