# Sports Radar ETL Submission

## Description

This repo contains very basic node pipelines to extract key data points from multiple Sports Radar APIs. The pipelines then transform this data into a neat package and loads it into CSV files.

To obtain a teams...

- Team ID
- Team Name
- Team Venue Name
- Games Played
- Wins
- Losses
- Points
- Goals Per Game
- Game Date of First Game of Season
- Opponent Name in First Game of Season

and a players...

- Player ID
- Player Name
- Current Team
- Player Age
- Player Number
- Player Position
- If the player is a rookie
- Assists
- Goals
- Games
- Hits
- Points

...both as seperate CSV files, please follow the intructions below

## Install & Instructions

1. Clone this repo

2. Pull down the repo on to your local machine

3. run `npm install`

4. run `node index.js`

You can run `npm test` to see the tests

## Vulnerabilities

- Currently these pipelines can not verify data before the extract stage i.e. teamId / playerId. This could result in failed attempts to retrieve data.
- Complete test coverage is lacking on pipelines due to time constraints.
- Both pipelines use hardcoded paths/dot notation to access specific data, without knowing if these APIs return consistent data structures this could be a weak point.
- The error handling and logging needs to be standerdized across the app.
- These pipelines access open APIs.
