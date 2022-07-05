import React, { useState } from "react";
import DropDown from "../UI/DropDown";
import ErrorModal from "../UI/ErrorModal";
import classes from "./SearchForm.module.css";
import { IconContext } from "react-icons";
import { BiSearchAlt } from "react-icons/bi";
import RetrieveData from "./RetrieveData";
import ClipLoader from "react-spinners/ClipLoader";
import playerDict from "./ExampleData";

//need to make the data sender in a statet (maybe state is searched data)

const SearchForm = (props) => {
  console.log(playerDict);
  const [summonerName, setSummonerName] = useState("");
  const [selectedRegion, setRegion] = useState("DEFAULT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dummySearch, setDummySearch] = useState(false);

  const saveRegionDataHandler = (data) => {
    setRegion(data);
  };

  const summonerNameChangeHandler = (event) => {
    setSummonerName(event.target.value);
  };

  const dummySearchSubmitHandler = (event) => {
    event.preventDefault();
    setDummySearch(true);
    props.onSearch(playerDict);
  };

  const searchSubmitHandler = async (event) => {
    event.preventDefault();
    //put data into the api
    if (summonerName.trim().length === 0 || selectedRegion === "DEFAULT") {
      console.log("missing values");
      setError({
        title: "Invalid entry",
        message: "Please select a region and/or enter a sumoner name",
      });
      return;
    }

    //is loading state
    setLoading(true);

    let save = await RetrieveData(summonerName, selectedRegion).catch(
      (error) => error
    );

    setLoading(false);
    if (save instanceof Error) {
      if (save.message === "Failed to fetch") {
        setError({
          title: "Invalid Summoner",
          message: "Please enter a valid summoner name",
        });
      }
      if (
        save.message ===
        "Cannot read properties of undefined (reading 'teamId')"
      ) {
        setError({
          title: "Invalid Team",
          message: "No clash team exists for this summoner.",
        });
      }
    } else {
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
        <ErrorModal
          title={error.title}
          message={error.message}
          onClick={errorChangeHandler}
        />
      )}
      {loading && (
        <div className={classes.loading}>
          Fetching results...
          <ClipLoader size={20} color={"FFFFFF"} loading={loading} />
        </div>
      )}
      {dummySearch ? (
        <button
          onClick={() => window.location.reload()}
          className={classes.exampleSearch}
        >
          {" "}
          Clear example search
        </button>
      ) : (
        <button
          onClick={dummySearchSubmitHandler}
          className={classes.exampleSearch}
        >
          Click for example search
        </button>
      )}

      <form onSubmit={searchSubmitHandler} className={classes.searchBar}>
        <DropDown
          onSaveRegionData={saveRegionDataHandler}
          selectedRegion={selectedRegion}
        />
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
