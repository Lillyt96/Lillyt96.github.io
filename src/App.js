import React, { useState, useEffect} from "react";
import SearchForm from "./Components/Search/SearchForm";
import PlayersList from "./Components/Player/PlayerList";


const App = () => {
  const [playerData, setPlayerData] = useState("");

  const onSearchHandler = (retrievedPlayerData) => {
    setPlayerData(retrievedPlayerData)
    return playerData;
  }

  

  return (
    <div>
      <SearchForm onSearch={onSearchHandler}/>
      <PlayersList items={playerData} />
    </div>
  );
}

export default App;
