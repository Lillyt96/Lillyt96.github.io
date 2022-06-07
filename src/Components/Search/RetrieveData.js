const RIOT_API_KEY = "RGAPI-cc590900-ec25-4b9e-bc88-1dfe6507eba2";
const summoner_name = "5he";
// Defining async function
function getOpggUrl(summoner_name, RIOT_API_KEY) {
  fetch(
    `https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_name}?api_key=${RIOT_API_KEY}`,
    {
      accept: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((rest) => rest.text())
    .then((text) => console.log(text));
  // var summoner_id = await summoner_response.json();
  // console.log(summoner_id)
}

export default getOpggUrl;
