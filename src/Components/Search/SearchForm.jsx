import React, { useState } from "react";
import DropDown from "../UI/DropDown";
import classes from "./SearchForm.module.css";
import { IconContext } from "react-icons";
import { BiSearchAlt } from "react-icons/bi";
import RetrieveData from "./RetrieveData";

//need to make the data sender in a statet (maybe state is searched data)


const SearchForm = (props) => {
  const [summonerName, setSummonerName] = useState("");
  const [selectedRegion, setRegion] = useState("DEFAULT");


  const saveRegionDataHandler = (data) => {
    setRegion(data);
  };

  const summonerNameChangeHandler = (event) => {
    setSummonerName(event.target.value);
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    console.log("button pressed");
    //put data into the api
    
    props.onSearch(RetrieveData(summonerName, selectedRegion));

    // props.onSaveSearch();

    setSummonerName("");
    setRegion("DEFAULT");
  };


  return (
    <>
      <div>
        <form onSubmit={searchSubmitHandler} className={classes.searchBar}>
          <DropDown onSaveRegionData={saveRegionDataHandler} selectedRegion={selectedRegion}/>
          <label htmlFor="User" />
          <input
            id="user"
            type="text"
            placeholder="Enter a summoner name"
            value={summonerName}
            onChange={summonerNameChangeHandler}
          />
          <button type="submit">
            <IconContext.Provider value={{ color: "white", size: "30px" }}>
              <div>
                <BiSearchAlt />
              </div>
            </IconContext.Provider>
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
