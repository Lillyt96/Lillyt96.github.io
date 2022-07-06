import PlayerItem from "./PlayerItem";
import classes from "./PlayerList.module.css";

const PlayerList = (props) => {
  console.log(props.items.opggURL);

  return (
    <>
      {props.items.playersData !== undefined && (
        <div className={classes.card}>
          <a className={classes.opgg} target="_blank" rel="noopener noreferrer" href={props.items.opggURL}>Opgg link to detailed player information</a>
          <ul>
            {props.items.playersData.map((player) => (
              <PlayerItem
                key={Math.random()}
                name={player.name}
                position={player.position}
                gamesNumb={player.gamesNumb}
                rank={player.rank}
                winRate={player.winRate}
                mainRole={player.mainRole}
                topChampions={player.topChampions}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default PlayerList;
