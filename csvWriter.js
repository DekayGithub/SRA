const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const writeCSV = async (fileName, headers) => {
  const write = createCsvWriter({
    path: `CSVs/${filename}.csv`,
    header: headers,
  });
};

module.exports = {
  writeCSV,
};
