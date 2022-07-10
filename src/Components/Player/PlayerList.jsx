import PlayerItem from "./PlayerItem";
import classes from "./PlayerList.module.css";
import { IconContext } from "react-icons";
import { RiErrorWarningLine } from "react-icons/ri";

const PlayerList = (props) => {
  console.log(props.items.opggURL);

  return (
    <>
      {props.items.playersData !== undefined && (
        <div className={classes.card}>
          {!props.items.clashTeam && (
          <div className={classes.noTeamMessage}>
             <IconContext.Provider value={{ color: "rgb(255, 255, 255)", size: "30px"}}>
              <RiErrorWarningLine />
            </IconContext.Provider>
            <p>Note: this player is not part of a clash Team</p>
          </div>
          )}
          <a className={classes.opgg} target="_blank" rel="noopener noreferrer" href={props.items.opggURL}>Opgg link to detailed player information</a>
          <ul>
            {props.items.playersData.map((player, i) => (
              <PlayerItem
                key={i}
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
