const { handleError } = require("../errorHandler");

const mockError = new Error();
const mockSource = "Test Source";

describe("Error Handler", () => {
  test("console logs specific string based on input", () => {
    console.log = jest.fn();
    handleError(mockSource, mockError);

    const expected = `An error occurd in ${mockSource}: ${mockError}`;

    expect(console.log).toHaveBeenCalledWith(expected);
  });
});
