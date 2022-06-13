
import classes from "./PlayerItem.module.css";

const PlayerItem = (props) => {
    return (
        <div className={classes.players}>
            <h2>{props.name}, {props.position} </h2>
            <div>{props.rank}</div>
            <div>{props.winRate}</div>
        </div>
    )
}

export default PlayerItem;