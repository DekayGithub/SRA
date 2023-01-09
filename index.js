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

const startTeamNHLPipeline = async (teamId, season) => {
  try {
    // extract
    const allTeamData = Promise.all([
      getData(TEAMS_API_URL + `/${teamId}`),
      getData(TEAMS_API_URL + `/${teamId}/stats`, { season }),
      getData(TEAMS_SCHEDULE_URL, { season, teamId }),
    ]);

    const [teamData, teamStatData, teamSchedule] = await allTeamData;

    // transform
    const { id, name, venue } = teamData.teams[0];

    const {
      gamesPlayed,
      wins,
      losses,
      pts: points,
      goalsPerGame,
    } = teamStatData.stats[0].splits[0].stat;

    const teamsPlayed = Object.values(teamSchedule.dates[0].games[0].teams).map(
      (team) => ({ id: team.team.id, name: team.team.name })
    );
    const firstGameOpponent = teamsPlayed.filter((team) => team.id !== teamId);
    const firstGameDate = teamSchedule.dates[0].date;

    // load
  } catch (error) {
    console.log("NHL Pipeline error:", error);
  }
};

startTeamNHLPipeline(5, "20032004");
