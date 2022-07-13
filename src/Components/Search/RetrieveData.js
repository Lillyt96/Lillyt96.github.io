import regions from "../UI/StaticInputData/RegionData";
import RegionData from "../UI/StaticInputData/RegionData"

// Finds the top occuring key in an object
const findTopValue = (obj, topN) => {
  let topObj = {};
  let keys = Object.keys(obj);
  keys.sort((a, b) => {
    return obj[a] - obj[b];
  });

  keys
    .slice(-topN)
    .reverse()
    .forEach((k) => {
      topObj[k] = obj[k];
    });

  let topArr = [];

  for (let key in topObj) {
    topArr.push([key, topObj[key]]);
  }

  return topArr;
};

const retrieveRegionIndex = (enteredLabel) => {
  return RegionData.findIndex(RegionData => RegionData.value === enteredLabel)
}

export const RetrieveScheduleData = async (enteredRegion) => {
  /* API CALL - retrieves upcoming clash schedule
  Inputs: enteredRegion */
  const scheduleDataResponse = await fetch (
    `https://${enteredRegion}.api.riotgames.com/lol/clash/v1/tournaments?api_key=${process.env.REACT_APP_API_KEY}`,
    {
      accept: {
        "Content-Type": "application/json",
      },
    }
  ) 

  let scheduleData = (await scheduleDataResponse.json())
  
  // Push tournaments to array
  let scheduleDataArr = []
  for (let i = 0; i < scheduleData.length; i++) {
    let tournament = {nameKey: scheduleData[i].nameKey, nameDate: scheduleData[i].schedule[0].startTime}
    scheduleDataArr.push(tournament)
  }

  // Sort array by unix time descending
  scheduleDataArr.sort((a, b) => {
    return a.nameDate - b.nameDate
  });

  return scheduleDataArr;

}

export const RetrieveTeamData = async (enteredSummonerName, enteredRegion) => {

  const numbOfGames = 15;
  /* API CALL - retrieves summonerID
  Inputs: enteredRegion, summonerName */
  const summonerIdResponse = await fetch(
    `https://${enteredRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${enteredSummonerName}?api_key=${process.env.REACT_APP_API_KEY}`,
    {
      accept: {
        "Content-Type": "application/json",
      },
    }
  );

  let summonerId = (await summonerIdResponse.json())["id"];

  /* API CALL - retrieves clashTeamId
  Inputs: enteredRegion, summonerId */
  const teamIdResponse = await fetch(
    `https://${enteredRegion}.api.riotgames.com/lol/clash/v1/players/by-summoner/${summonerId}?api_key=${process.env.REACT_APP_API_KEY}`,
    {
      accept: {
        "Content-Type": "application/json",
      },
    }
  );

  let teamIdAwait =  await teamIdResponse.json();

  // Handles when the user doesn't have a clash team
  let teamMembers;
  let clashTeam;
  if(Object.keys(teamIdAwait).length === 0){
    teamMembers = [{"summonerId": summonerId}]
    clashTeam = false;
  }
  else {
    /* API CALL - retrieves summonerIDs and position information of players
    Inputs: enteredRegion, teamID */
    clashTeam = true;
    let teamId = teamIdAwait[0]["teamId"];
    const teamMembersResponse = await fetch(
      `https://${enteredRegion}.api.riotgames.com/lol/clash/v1/teams/${teamId}?api_key=${process.env.REACT_APP_API_KEY}`,
      {
        accept: {
          "Content-Type": "application/json",
        },
      }
    );
    teamMembers = (await teamMembersResponse.json())["players"];
  }

  let playersData = [];
  for (var player of teamMembers) {
    let playerSummonerID = player["summonerId"];
    /* API CALL - retrieves summonerName and puuid of players
    Inputs: enteredRegion, summonerID */
    const playerSummonerNameResponse = await fetch(
      `https://${enteredRegion}.api.riotgames.com/lol/summoner/v4/summoners/${playerSummonerID}?api_key=${process.env.REACT_APP_API_KEY}`,
      {
        accept: {
          "Content-Type": "application/json",
        },
      }
    );

    let accountInfo = await (playerSummonerNameResponse.json());
    let summonerName = accountInfo["name"];
    let summonerPosition = player["position"];
    let summonerPuuid = accountInfo["puuid"];


    /* API CALL - retrieves player(s) rank and win rate
    Inputs: enteredRegion, playerSummonerID */
    const summonerRankInfoResponse = await fetch(
      `https://${enteredRegion}.api.riotgames.com/lol/league/v4/entries/by-summoner/${playerSummonerID}?api_key=${process.env.REACT_APP_API_KEY}`,
      {
        accept: {
          "Content-Type": "application/json",
        },
      }
    );

    let summonerRankInfo = await summonerRankInfoResponse.json();
    let summonerRank;
    let summonerWR;

    // Handle if they're unranked
    if(Object.keys(summonerRankInfo).length === 0){
      summonerRank = "Unranked";
      summonerWR = "N/A"
    }

    else 
    {
    let rankedIndex = summonerRankInfo.findIndex((element) => element["queueType"] === "RANKED_SOLO_5x5");
    summonerRank = `${summonerRankInfo[rankedIndex]["tier"]} ${summonerRankInfo[rankedIndex]["rank"]}`;
    summonerWR = parseInt(
      (summonerRankInfo[rankedIndex]["wins"] /
        (summonerRankInfo[rankedIndex]["wins"] + summonerRankInfo[rankedIndex]["losses"])) *
        100
    );
    }

    /* API CALL - retrieves past n matche ids
    Inputs: enteredRegion, summonerPuuid, numbOfGames*/
    const summonerMatchesResponse = await fetch(
      `https://${regions[retrieveRegionIndex(enteredRegion)].broadRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?type=ranked&start=0&count=${numbOfGames}&api_key=${process.env.REACT_APP_API_KEY}`,
      {
        accept: {
          "Content-Type": "application/json",
        },
      }
    );

    let summonerMatches = await summonerMatchesResponse.json();

    // Initalise match detail objects
    let roleCounterObj = {};
    let championPoolObj = {};


    /* API CALL - retrieves match details from above n matches
    Inputs: enteredRegion, matchId
    LIMITATION: only working for Americas servers*/
    for (let match of summonerMatches) {
      const summonerMatchInfoResponse = await fetch(
        `https://${regions[retrieveRegionIndex(enteredRegion)].broadRegion}.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${process.env.REACT_APP_API_KEY}`,
        {
          accept: {
            "Content-Type": "application/json",
          },
        }
      );

      // Select participant data
      let summonerMatchInfo = (await summonerMatchInfoResponse.json())["info"][
        "participants"
      ];

      for (var participant of summonerMatchInfo) {
        // Select summoners participant data
        if (
          participant["summonerName"].toLowerCase() === summonerName.toLowerCase()
        ) {
          // Extract most played role and create counter object. Structure "champion": counter (int)
          if (participant["individualPosition"] in roleCounterObj) {
            roleCounterObj[participant["individualPosition"]] = ++roleCounterObj[
              participant["individualPosition"]
            ];
          } else {
            roleCounterObj[participant["individualPosition"]] = 1;
          }

          // Extract most played champions. Structure "champion": counter (int)
          if (participant["championName"] in championPoolObj) {
            championPoolObj[participant["championName"]] = ++championPoolObj[
              participant["championName"]
            ];
          } else {
            championPoolObj[participant["championName"]] = 1;
          }
        }
      }
    }

    // Create object that collates the summoner's data
    const userData = 
      {
        name: summonerName,
        position: summonerPosition,
        gamesNumb: numbOfGames,
        rank: summonerRank,
        winRate: summonerWR,
        mainRole: findTopValue(roleCounterObj, 2),
        topChampions: findTopValue(championPoolObj, 5),
      }

    // Push collated user data to array 
    playersData.push(userData);
  };

    /* Collate opgg URL for the team
    LIMITATION - currently only works for OCE*/
    let opggURL = `https://${regions[retrieveRegionIndex(enteredRegion)].label}.op.gg/multi/query=`;

    for (player of playersData) {
      let playerFormatted = player['name'].replace(" ", "%20");
      opggURL += playerFormatted + "%2C"
    }

    // Collates all player data to one object
    const playerDict = {
      playersData: playersData,
      opggURL: opggURL,
      clashTeam: clashTeam
    };
  
  // Returns the object
  return playerDict;
};
