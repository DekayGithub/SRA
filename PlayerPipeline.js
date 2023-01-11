const { handleError } = require("./errorHandler");
const { writeCSV } = require("./csvWriter");
const { getData } = require("./request");

const PLAYER_API_URL = "https://statsapi.web.nhl.com/api/v1/people";
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
    const allPlayerData = Promise.all([
      getData(PLAYER_API_URL + `/${playerId}`),
      getData(PLAYER_API_URL + `/${playerId}/stats`, {
        stats: "statsSingleSeason",
        season,
      }),
    ]);

    const [playerData, playerStats] = await allPlayerData;

    const {
      id,
      fullName,
      currentTeam,
      currentAge,
      primaryNumber,
      rookie,
      primaryPosition,
    } = playerData.people[0];

    const { assists, goals, games, hits, points } =
      playerStats.stats[0].splits[0].stat;

    // transform
    const records = [
      {
        playerId: id,
        playerName: fullName,
        currentTeam: currentTeam.name,
        playerAge: currentAge,
        playerNumber: primaryNumber,
        playerPosition: primaryPosition.name,
        isARookie: rookie,
        assists,
        goals,
        games,
        hits,
        points,
      },
    ];
    // load
    writeCSV(`${season}-${fullName}`, HEADERS, records);
  } catch (error) {
    handleError("NHL Player Pipeline", error);
  }
};

startPlayerNHLPipeline(8476792, "20182019");
