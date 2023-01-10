const { handleError } = require("./errorHandler");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const writeCSV = (fileName, headers, records) => {
  const write = createCsvWriter({
    path: `CSVs/${fileName}.csv`,
    header: headers,
  });

  write
    .writeRecords(records)
    .then(() => {
      console.log("CSV file created");
    })
    .catch(handleError);
};

module.exports = {
  writeCSV,
};
