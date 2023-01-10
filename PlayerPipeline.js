const { handleError } = require("./errorHandler");
const { writeCSV } = require("./csvWriter");
const { getData } = require("./request");

const HEADERS = [
  { id: "playerId", title: "Player ID" },
  { id: "playerName", title: "Player Name" },
  { id: "currentTeam", title: "Current Team" },
  { id: "playerAge", title: "Player Age" },
  { id: "playerNumber", title: "Player Number" },
  { id: "playerPosition", title: "Player Position" },
  { id: "isARookie", title: "Is a Rookie?" },
  { id: "assists", title: "Assists" },
  { id: "goals", title: "Goals" },
  { id: "games", title: "Games" },
  { id: "hits", title: "Hits" },
  { id: "points", title: "Points" },
];

const startPlayerNHLPipeline = async (playerId, season) => {
  try {
    // extract
    //
    // transform
    //
    // const records = [{}];
    // load
    // writeCSV(`${season}-${playerName}`, HEADERS, records);
  } catch (error) {
    handleError("NHL Player Pipeline", error);
  }
};

startPlayerNHLPipeline(5, "20032004");
