import classes from "./DropDown.module.css";

const DropDown = (props) => {
  return (
    <select
      value={props.selectedRegion}
      onChange={(event) => {props.onSaveRegionData(event.target.value)}}
      className={classes.dropDown}
    >
      <option value="DEFAULT" disabled>Select a region</option>
      <option value="RU">RU</option>
      <option value="TR1">TR</option>
      <option value="OC1">OCE</option>
      <option value="BR1">BR</option>
      <option value="LA2">LAS</option>
      <option value="EUN1">EUNE</option>
      <option value="EUW1">EUW</option>
      <option value="NA1">NA</option>
      <option value="KR">KR</option>
      <option value="LA1">LAN</option>
    </select>
  );
};

export default DropDown;
