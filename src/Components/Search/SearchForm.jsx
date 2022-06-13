import React, { useState } from "react";
import DropDown from "../UI/DropDown";
import ErrorModal from "../UI/ErrorModal";
import classes from "./SearchForm.module.css";
import { IconContext } from "react-icons";
import { BiSearchAlt } from "react-icons/bi";
import RetrieveData from "./RetrieveData";

//need to make the data sender in a statet (maybe state is searched data)


const SearchForm = (props) => {
  const [summonerName, setSummonerName] = useState("");
  const [selectedRegion, setRegion] = useState("DEFAULT");
  const [error, setError] = useState("");


  const saveRegionDataHandler = (data) => {
    setRegion(data);
  };

  const summonerNameChangeHandler = (event) => {
    setSummonerName(event.target.value);
  };

  const searchSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("button pressed");
    //put data into the api
    
    let save = await RetrieveData(summonerName, selectedRegion).catch(error => error)
    if (save instanceof Error) {
      if (save.message === "Failed to fetch") {
        setError({title: "Invalid Summoner", message:"Please enter a valid summoner name"})
      }
      if (save.message === "Cannot read properties of undefined (reading 'teamId')") {
        setError({title:"Invalid Team", message:"No clash team exists for this summoner."})
      }
    }
    else {
      props.onSearch(save);
    }
    setSummonerName("");
    setRegion("DEFAULT");
  };




  const errorChangeHandler = (props) => {
    setError("");
  };

  return (
    <>
    {error && (
      <ErrorModal title={error.title} message={error.message} onClick={errorChangeHandler} />
    )}
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
    </>
  );
};

export default SearchForm;
