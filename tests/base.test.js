const { handler } = require("../paths/base");

describe("/", () => {
  describe("200", () => {
    it("should return 200", () => {
      const description = {
        description: "An endpoint to collect pictures of Peter Martin Blanco",
        schema:
          "https://github.com/pataruco/pod-api/blob/master/config/swagger.yaml"
      };

      const response = {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {},
        body: JSON.stringify(description)
      };
      expect(handler()).toEqual(response);
    });
  });
});
