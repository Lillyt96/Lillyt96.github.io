import React, {useRef} from "react";

const DropDown = (props) => {
    const regionInputRef = useRef();

  const setRegionData = (event) => {
    event.preventDefault();
    const enteredRegion = regionInputRef.current.value;
    props.onSaveRegionData(enteredRegion)

  }
  return (
    <select ref={regionInputRef} onChange={setRegionData} >
      <option value="Russia">
        RU
      </option>
      <option value="Turkey">TR</option>
      <option selected value="Oceania">
        OCE
      </option>
      <option value="Brazil">BR</option>
      <option value="Latin South America">LAS</option>
      <option value="Europe Nordic and East">EUNE</option>
      <option value="Europe West">EUW</option>
      <option value="North America">NA</option>
      <option value="Korea">KR</option>
      <option value="Latin America North">LAN</option>
    </select>
  );
};

export default DropDown;
