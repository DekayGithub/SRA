const axios = require("axios");

const getData = (url, qs) =>
  axios({
    url,
    method: "GET",
    params: { ...(qs ? qs : {}) },
  });

module.exports = {
  getData,
};
