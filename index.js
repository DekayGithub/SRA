const rp = require('request-promise');

const TEAMS_API_URL = 'https://statsapi.web.nhl.com/api/v1/teams'

const getAllTeams = () => 
  rp({
    uri: TEAMS_API_URL,
    method: 'GET',
    json: true
    })

const startNHLPipeline = async () => {
  try {
    // extract
    // transform
    // load
  } catch (error){
    console.log('NHL Pipeline error:', error)
  }
}

getAllTeams().then(data => console.log(data));