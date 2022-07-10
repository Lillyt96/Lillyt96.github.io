import React, { useState } from "react";
import SearchForm from "./Components/Search/SearchForm";
import PlayersList from "./Components/Player/PlayerList";

const App = () => {
  const [playerDict, setPlayerDict] = useState("");
  const onSearchHandler = (retrievedPlayersData) => {
    setPlayerDict(retrievedPlayersData)
    console.log(playerDict);
    return playerDict;
  }

  return (
    <div>
      <SearchForm onSearch={onSearchHandler}/>
      <PlayersList items={playerDict} />
    </div>
  );
}

export default App;
