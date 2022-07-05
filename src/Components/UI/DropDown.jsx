import classes from "./DropDown.module.css";


const regions = [
  { value: "DEFAULT", label: "Select a region" },
  { value: "RU", label: "RU" },
  { value: "TR1", label: "TR" },
  { value: "OC1", label: "OCE" },
  { value: "BR1", label: "BR" },
  { value: "LA2", label: "LAS" },
  { value: "EUN1", label: "EUNE" },
  { value: "EUW1", label: "EUW" },
  { value: "NA1", label: "NA" },
  { value: "KR", label: "KR" },
  { value: "LA1", label: "LAN" },
];

const DropDown = (props) => {
  return (
    <select
      value={props.selectedRegion}
      onChange={(event) => {
        props.onSaveRegionData(event.target.value);
      }}
      className={classes.dropDown}
    >
      {regions.map((item, index) => {
        return(<option key={index} value={item.value}>{item.label}</option>);
      })}
    </select>
  );
};

export default DropDown;
