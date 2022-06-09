const  RetrieveData = async (summonerName, enteredRegion) => {
    const riotAPIKey = "RGAPI-4f8f6639-9efb-4626-8e66-11deef3fc61b";


    //Get summoner ID
    const summonerIdResponse = await fetch(
      `https://${enteredRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${riotAPIKey}`,
      {
        accept: {
          "Content-Type": "application/json",
        },
      }
    )
    let summonerId = (await summonerIdResponse.json())["id"];
    console.log(summonerId);

      //Get clash team ID
    const teamIdResponse = await fetch(
        `https://${enteredRegion}.api.riotgames.com/lol/clash/v1/players/by-summoner/${summonerId}?api_key=${riotAPIKey}`,
        {
          accept: {
            "Content-Type": "application/json",
          },
        }
      )

      let teamId = (await teamIdResponse.json())[0]["teamId"];
      console.log(teamId);

      //Get clash team plays summoner ID
      const teamMembersResponse = await fetch(
        `https://${enteredRegion}.api.riotgames.com/lol/clash/v1/teams/${teamId}?api_key=${riotAPIKey}`,
        {
          accept: {
            "Content-Type": "application/json",
          },
        }
      )

      let teamMembers = (await teamMembersResponse.json())["players"];

      let players = [];
      for (var player of teamMembers) { //probs need to fix this
        let playerSummonerID = player["summonerId"];
      
          const playerSummonerNameResponse = await fetch(
            `https://${enteredRegion}.api.riotgames.com/lol/summoner/v4/summoners/${playerSummonerID}?api_key=${riotAPIKey}`,
            {
              accept: {
                "Content-Type": "application/json",
              },
            } 
          );

          let playerSummonerName = await playerSummonerNameResponse.json();
          let playerData = {"name":playerSummonerName['name'], "position":player["position"]};
          players.push(playerData);
      }

      //get opgglink
      let opggURL = "https://oce.op.gg/multi/query=";
      for (player of players) {
        let playerFormatted = player['name'].replace(" ", "%20");
        opggURL += playerFormatted + "%2C"
      }

      //group information
      const playerDict = {
        userData: players,
        opggURL: opggURL
      };
      
      return playerDict;


  };


export default RetrieveData;
