const { handler } = require("../paths/date-id-file-id");

describe("/date/dateId/fileId", () => {
  it("should return 200", async () => {
    const event200 = {
      pathParameters: {
        dateId: "2017-01-25",
        fileId: "1"
      }
    };

    const bodyResponse = {
      url: "production/2017-01-25_2.jpeg"
    };

    const response = {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body: JSON.stringify(bodyResponse)
    };

    expect(await handler(event200)).toEqual(response);
  });
});
