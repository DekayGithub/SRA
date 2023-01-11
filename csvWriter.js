const { handleError } = require("./errorHandler");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const writeCSV = (fileName, headers, records) => {
  if (!fileName) throw new Error(`File Name is ${fileName}`);
  const write = createCsvWriter({
    path: `CSVs/${fileName}.csv`,
    header: headers,
  });

  write
    .writeRecords(records)
    .then(() => {
      console.log("CSV file created");
    })
    .catch((error) => handleError("CSV Writer", error));
};

module.exports = {
  writeCSV,
};
