import PlayerItem from "./PlayerItem";

const PlayerList = (props) => {
  let results = props.items;

  console.log(results)
  // return (
  //   <ul>
  //     {console.log(props.items)}
  //     {/* {props.items.map((player) => (
  //       <PlayerItem
  //         key={player.id}
  //         name={player.name}
  //         link={player.link}
  //         rank={player.rank}
  //         winRate={player.winRate}
  //       />
  //     ))} */}
  //   </ul>
  // );
};

export default PlayerList;
