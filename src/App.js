import React, { useState } from "react";
import SearchForm from "./Components/Search/SearchForm";
import PlayersList from "./Components/Player/PlayerList";

const App = () => {
  const [playerDict, setPlayersDict] = useState("");

  const onSearchHandler = (retrievedPlayersData) => {
    setPlayersDict(retrievedPlayersData)
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
