const PlayerItem = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>
            <div>{props.link}</div>
            <div>{props.rank}</div>
            <div>{props.winRate}</div>
        </div>
    )
}

export default PlayerItem;