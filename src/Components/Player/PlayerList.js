import PlayerItem from "./PlayerItem";
import classes from "./PlayerList.module.css";

const PlayerList = (props) => {
  return (
    <>
      {props.items.userData !== undefined && (
        <div className={classes.card}>
          <ul>
            {props.items.userData.map((player) => (
              <PlayerItem
                key={Math.random()}
                name={player.name}
                position={player.position}
                // link={player.link}
                rank="rank"
                winRate="WR"
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default PlayerList;
