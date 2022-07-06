const findTopValue = (obj, topN) => {
  let topObj = {};
  var keys = Object.keys(obj);
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

  for (var key in topObj) {
    topArr.push([key, topObj[key]]);
  }

  return topArr;
};

const RetrieveData = async (enteredSummonerName, enteredRegion) => {
  const riotAPIKey = "RGAPI-54e1ba63-0bd4-4209-a740-6508747f635b";
  const numbOfGames = 15;

  //Get summoner ID
  const summonerIdResponse = await fetch(
    `https://${enteredRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${enteredSummonerName}?api_key=${riotAPIKey}`,
    {
      accept: {
        "Content-Type": "application/json",
      },
    }
  );

  let summonerId = (await summonerIdResponse.json())["id"];

  //Get clash team ID
  const teamIdResponse = await fetch(
    `https://${enteredRegion}.api.riotgames.com/lol/clash/v1/players/by-summoner/${summonerId}?api_key=${riotAPIKey}`,
    {
      accept: {
        "Content-Type": "application/json",
      },
    }
  );

  let teamId = (await teamIdResponse.json())[0]["teamId"];

  //Get clash team plays summoner ID
  const teamMembersResponse = await fetch(
    `https://${enteredRegion}.api.riotgames.com/lol/clash/v1/teams/${teamId}?api_key=${riotAPIKey}`,
    {
      accept: {
        "Content-Type": "application/json",
      },
    }
  );

  let teamMembers = (await teamMembersResponse.json())["players"];

  let playersData = [];
  for (var player of teamMembers) {
    let playerSummonerID = player["summonerId"];

    const playerSummonerNameResponse = await fetch(
      `https://${enteredRegion}.api.riotgames.com/lol/summoner/v4/summoners/${playerSummonerID}?api_key=${riotAPIKey}`,
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

    //get summoner rank
    const summonerRankInfoResponse = await fetch(
      `https://${enteredRegion}.api.riotgames.com/lol/league/v4/entries/by-summoner/${playerSummonerID}?api_key=${riotAPIKey}`,
      {
        accept: {
          "Content-Type": "application/json",
        },
      }
    );

    let summonerRankInfo = await summonerRankInfoResponse.json();
    let rankedIndex = summonerRankInfo.findIndex((element) => element["queueType"] === "RANKED_SOLO_5x5");
    console.log(rankedIndex)
    let summonerRank = `${summonerRankInfo[rankedIndex]["tier"]} ${summonerRankInfo[rankedIndex]["rank"]}`;
    let summonerWR = parseInt(
      (summonerRankInfo[rankedIndex]["wins"] /
        (summonerRankInfo[rankedIndex]["wins"] + summonerRankInfo[rankedIndex]["losses"])) *
        100
    );

    //get match id for player
    const summonerMatchesResponse = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?type=ranked&start=0&count=${numbOfGames}&api_key=${riotAPIKey}`,
      {
        accept: {
          "Content-Type": "application/json",
        },
      }
    );

    let summonerMatches = await summonerMatchesResponse.json();

    //get match details for player
    let winRate = { WIN: 0, LOSS: 0 };
    let roleCounterObj = {};
    let championPoolObj = {};

    for (let match of summonerMatches) {
      const summonerMatchInfoResponse = await fetch(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${riotAPIKey}`,
        {
          accept: {
            "Content-Type": "application/json",
          },
        }
      );

      let summonerMatchInfo = (await summonerMatchInfoResponse.json())["info"][
        "participants"
      ];

      for (var participant of summonerMatchInfo) {
        if (
          participant["summonerName"].toLowerCase() === summonerName.toLowerCase()
        ) {
          // MOST PLAYED POSITION
          if (participant["individualPosition"] in roleCounterObj) {
            roleCounterObj[participant["individualPosition"]] = ++roleCounterObj[
              participant["individualPosition"]
            ];
          } else {
            roleCounterObj[participant["individualPosition"]] = 1;
          }
          // WINRATE
          if (participant["win"]) {
            winRate.WIN = ++winRate["WIN"];
          } else if (!participant["win"]) {
            winRate.LOSS = ++winRate["LOSS"];
          }

          // MOST PLAYED CHAMPIONS
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
    
    playersData.push(userData);
  };

    //get opgglink
    let opggURL = "https://oce.op.gg/multi/query=";

    for (player of playersData) {
      let playerFormatted = player['name'].replace(" ", "%20");
      opggURL += playerFormatted + "%2C"
    }

    // group information
    const playerDict = {
      playersData: playersData,
      opggURL: opggURL
    };

  return playerDict;

};

export default RetrieveData;
