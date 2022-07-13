import classes from "./PlayerItem.module.css";

const PlayerItem = (props) => {
  return (
    <>
      <div className={classes.playerItemHeader}>
        {props.name}, {props.position}{" "}
      </div>
      <div className={classes.playerItemStats}>
        <h2>Solo Q information based on last {props.gamesNumb} games</h2>
        <div className={classes.playerItemStatsDetail}>
          Rank: {props.rank} {<br />}
          Winrate: {props.winRate}% {<br />}
          Main roles: 
          <ul>
            {props.mainRole.map((mainRole, i) => (
              <li key={i}>
                <img src={require(`../UI/StaticInputData/LaneIcons/${mainRole[0]}.png`)} alt="icon" />
                {`${mainRole[0]} (${mainRole[1]} games)`}</li>
            ))}
          </ul>
        </div>
        <div className={classes.playerItemStatsDetail}>
          Most played champions: 
          <ul>
            {props.topChampions.map((topChampions, i) => (
              <li key={i}>
                <img src={require(`../UI/StaticInputData/ChampIcons/${topChampions[0]}Square.png`)} alt="icon" />
                {`${topChampions[0]} (${topChampions[1]} games)`}
                </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PlayerItem;
