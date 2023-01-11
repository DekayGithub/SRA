const axios = require("axios");
const { handleError } = require("./errorHandler");

const getData = async (url, qs) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      params: { ...(qs ? qs : {}) },
    });
    return response;
  } catch (error) {
    handleError("Get Data", error);
    throw error;
  }
};

module.exports = {
  getData,
};
