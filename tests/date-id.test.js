const { handler } = require("../paths/date-id");

describe("/date/dateId", () => {
  describe("200", () => {
    const event200 = {
      pathParameters: {
        dateId: "2017-01-25"
      }
    };

    const bodyResponse = {
      date: "2017-01-25",
      files: [
        {
          url: "production/2017-01-25_2.jpeg"
        },
        {
          url: "production/2017-01-25_3.jpeg"
        },
        {
          url: "production/2017-01-25_4.jpeg"
        },
        {
          url: "production/2017-01-25_5.jpeg"
        },
        {
          url: "production/2017-01-25_6.jpeg"
        },
        {
          url: "production/2017-01-25_7.jpeg"
        },
        {
          url: "production/2017-01-25_8.jpeg"
        },
        {
          url: "production/2017-01-25_9.jpeg"
        }
      ]
    };

    const response = {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body: JSON.stringify(bodyResponse)
    };

    it("should return a 200 response", async () => {
      expect(await handler(event200)).toEqual(response);
    });
  });

  describe("400", async () => {
    const event400 = {
      pathParameters: {
        dateId: "pedro"
      }
    };

    const response = {
      isBase64Encoded: false,
      statusCode: 400,
      headers: {},
      body: JSON.stringify({
        message: "date format should be ISO"
      })
    };

    it("should return 400", async () => {
      expect(await handler(event400)).toEqual(response);
    });
  });

  describe("204", () => {
    it("should return 204", async () => {
      const event204 = {
        pathParameters: {
          dateId: "2019-01-25"
        }
      };

      const bodyResponse = undefined;

      const response = {
        isBase64Encoded: false,
        statusCode: 204,
        headers: {},
        body: JSON.stringify({
          message: "Date not found"
        })
      };

      expect(await handler(event204)).toEqual(response);
    });
  });
});
