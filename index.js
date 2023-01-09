const rp = require("request-promise");

const TEAMS_API_URL = "https://statsapi.web.nhl.com/api/v1/teams";
const TEAMS_SCHEDULE_URL = "https://statsapi.web.nhl.com/api/v1/schedule";

const getData = (uri, qs) =>
  rp({
    uri,
    method: "GET",
    ...(qs ? { qs } : {}),
    json: true,
  });

const startNHLPipeline = async (teamId, season) => {
  try {
    // extract
    const teamData = await getData(TEAMS_API_URL + `/${teamId}`);
    const { id, name, venue } = teamData.teams[0];

    const teamStatData = await getData(TEAMS_API_URL + `/${teamId}/stats`, {
      season,
    });
    const {
      gamesPlayed,
      wins,
      losses,
      pts: points,
      goalsPerGame,
    } = teamStatData.stats[0].splits[0].stat;

    const teamSchedule = await getData(TEAMS_SCHEDULE_URL, {
      season,
      teamId,
    });
    const teamsPlayed = Object.values(teamSchedule.dates[0].games[0].teams).map(
      (team) => ({ id: team.team.id, name: team.team.name })
    );
    const firstGameOpponent = teamsPlayed.filter((team) => team.id !== teamId);
    const firstGameDate = teamSchedule.dates[0].date;
    // transform

    // load
  } catch (error) {
    console.log("NHL Pipeline error:", error);
  }
};

startNHLPipeline(5, "20032004");
