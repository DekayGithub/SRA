const axios = require("axios");
const { getData } = require("../request");

jest.mock("axios");
const mockURL = "http://mock.mock";
const mockConfig = {
  url: mockURL,
  method: "GET",
  params: {},
};

describe("Axios Request", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("that getData calls axios with proper URL config", async () => {
    getData(mockURL);

    await expect(axios).toHaveBeenCalledWith(mockConfig);
  });
  test("that getData calls axios with proper URL & qs config", async () => {
    const mockQSConfig = { season: 20032004 };
    getData(mockURL, mockQSConfig);
    const newMockConfig = { ...mockConfig, params: mockQSConfig };

    await expect(axios).not.toHaveBeenCalledWith(mockConfig);
    await expect(axios).toHaveBeenCalledWith(newMockConfig);
  });
  test("that getData returns data successfully", async () => {
    const mockData = { team: "Mocking Birds" };
    axios.mockImplementationOnce(() => Promise.resolve(mockData));

    await expect(getData(mockConfig)).resolves.toEqual(mockData);
  });
  test("that getData can throw an error ", async () => {
    //check on this later, try/catch
    const errorMessage = "Mock Error";

    axios.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(getData(mockConfig)).rejects.toThrow(errorMessage);
  });
});
