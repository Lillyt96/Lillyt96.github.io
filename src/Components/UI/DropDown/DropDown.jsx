import classes from "./DropDown.module.css";
import RegionData from "../StaticInputData/RegionData.js"



const DropDown = (props) => {
  return (
    <select
      // Sets value as selectedRegion from searchForm
      value={props.selectedRegion}
      // Forwards selectedRegion to searchForm
      onChange={(event) => {
        props.onSaveRegionData(event.target.value);
      }}
      className={classes.dropDown}
    >
      {RegionData.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
