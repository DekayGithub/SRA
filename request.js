const rp = require("request-promise");

const getData = (uri, qs) =>
  rp({
    uri,
    method: "GET",
    ...(qs ? { qs } : {}),
    json: true,
  });

module.exports = {
  getData,
};
