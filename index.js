const { startTeamNHLPipeline } = require("./TeamPipeline");
const { startPlayerNHLPipeline } = require("./PlayerPipeline");

const TEAM_ID = 5;
const TEAM_SEASON = "20032004";

const PLAYER_ID = 8476792;
const PLAYER_SEASON = "20182019";

startTeamNHLPipeline(TEAM_ID, TEAM_SEASON);
startPlayerNHLPipeline(PLAYER_ID, PLAYER_SEASON);
