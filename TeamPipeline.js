const { handleError } = require("./errorHandler");
const { writeCSV } = require("./csvWriter");
const { getData } = require("./request");

const TEAMS_API_URL = "https://statsapi.web.nhl.com/api/v1/teams";
const TEAMS_SCHEDULE_URL = "https://statsapi.web.nhl.com/api/v1/schedule";
const HEADERS = [
  { id: "teamId", title: "Team ID" },
  { id: "teamName", title: "Team Name" },
  { id: "venueName", title: "Venue Name" },
  { id: "gamesPlayed", title: "Games Played" },
  { id: "wins", title: "Wins" },
  { id: "losses", title: "Losses" },
  { id: "points", title: "Points" },
  { id: "goalsPerGame", title: "Goals Per Game" },
  { id: "firstGameDate", title: "Date of First Game" },
  { id: "firstOpponent", title: "First Opponent" },
];

const getTeamsFirstOpponent = (scheduleData, teamId) => {
  const { teams } = scheduleData.dates[0].games[0];
  const teamsPlayed = Object.values(teams).map((team) => ({
    id: team.team.id,
    name: team.team.name,
  }));
  return teamsPlayed.find((team) => team.id !== teamId);
};

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
    const { id, name, venue } = teamData.data.teams[0];

    const {
      gamesPlayed,
      wins,
      losses,
      pts: points,
      goalsPerGame,
    } = teamStatData.data.stats[0].splits[0].stat;

    const { name: opponentName } = getTeamsFirstOpponent(
      teamSchedule.data,
      teamId
    );
    const firstGameDate = teamSchedule.data.dates[0].date;

    const records = [
      {
        teamId: id,
        teamName: name,
        venueName: venue.name,
        gamesPlayed,
        wins,
        losses,
        points,
        goalsPerGame,
        firstGameDate,
        firstOpponent: opponentName,
      },
    ];
    // load
    writeCSV(`${season}-${name}`, HEADERS, records);
  } catch (error) {
    handleError("NHL Team Pipeline", error);
  }
};

module.exports = {
  startTeamNHLPipeline,
};
