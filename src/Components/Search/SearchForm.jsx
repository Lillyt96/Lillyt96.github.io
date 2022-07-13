import React, { useState } from "react";
import DropDown from "../UI/DropDown/DropDown";
import ErrorModal from "../UI/ErrorModal/ErrorModal";
import classes from "./SearchForm.module.css";
import { IconContext } from "react-icons";
import { BiSearchAlt } from "react-icons/bi";
import { MdNotificationsActive } from "react-icons/md";
import { RetrieveTeamData, RetrieveScheduleData } from "./RetrieveData";
import ClipLoader from "react-spinners/ClipLoader";
import ExamplePlayerDict from "../UI/StaticInputData/ExampleData";

const SearchForm = (props) => {

  // State logic
  const [summonerName, setSummonerName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("DEFAULT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [exampleSearch, setexampleSearch] = useState(false);
  const [nextTournament, setnextTournament] = useState(false);

  // Retrieves selected region, sets region state and displays current region in pop-up.
  const saveRegionDataHandler = async (regionValue) => {
    setSelectedRegion(regionValue);
    setnextTournament(await RetrieveScheduleData(regionValue).catch(
      (error) => error
    ));
  };

  // Updates summonerName with inputed search value
  const summonerNameChangeHandler = (event) => {
    setSummonerName(event.target.value);
  };

  // sends example Data to App.js
  const exampleSearchSubmitHandler = (event) => {
    event.preventDefault();
    setexampleSearch(true);
    props.onSearch(ExamplePlayerDict);
  };

    // Reset error when the box has been closed
    const errorChangeHandler = (props) => {
      setError("");
    };

  // Handles error messages, Makes API call using summonerName and region inputs, and sends results to App.js
  const searchSubmitHandler = async (event) => {
    event.preventDefault();

    // Handles no input error
    if (summonerName.trim().length === 0 || selectedRegion === "DEFAULT") {
      setError({
        title: "Invalid entry",
        message: "Please select a region and/or enter a summoner name",
      });
      return;
    }

    // setLoading to true for loading wheel display
    setLoading(true);

    // Makes API call to retrieve data
    let save = await RetrieveTeamData(summonerName, selectedRegion).catch(
      (error) => error
    );

    // setLoading to false to remove loading wheel
    setLoading(false);

    // Catches unsuccessful API calls and sets error message
    if (save instanceof Error) {
      if (save.message === "Failed to fetch") {
        setError({
          title: "Invalid Summoner",
          message: "Please enter a valid summoner name",
        });
      }
      else if (save.message === "Cannot read properties of undefined (reading 'teamId')") {
        setError({
          title: "Invalid Team",
          message: "No clash team exists for this summoner.",
        });
      }
      else {
        setError({
          title: "Error fetching data",
          message: "There was a problem fetching.",
        });
      }
      return;
    }
    
      // If no errors, push API data to App.js through props
      props.onSearch(save);

      // Reset summonerName and region states
      setSummonerName("");
      setSelectedRegion("DEFAULT");
    };


    return (
      <>
        {/* Display next tournament notification */}
        {nextTournament && !(nextTournament instanceof Error) && selectedRegion !== "DEFAULT" && (
          <div className={classes.schedule}>
            <IconContext.Provider value={{ color: "rgb(46, 46, 46)", size: "40px" }}>
              <MdNotificationsActive />
            </IconContext.Provider>
            <p>
              {`The next clash tournament in ${selectedRegion} is ${(new Date(nextTournament[0].nameDate)).toDateString()}.`}
            </p>
          </div>
        )}

        {/* Display error modals */}
        {error && (
          <ErrorModal
            title={error.title}
            message={error.message}
            onClick={errorChangeHandler}
          />
        )}

        {/* Display loading wheel */}
        {loading && (
          <div className={classes.loading}>
            Fetching results...
            <ClipLoader size={20} color={"FFFFFF"} loading={loading} />
          </div>
        )}

        {/* Display search bar */}
        <form onSubmit={searchSubmitHandler} className={classes.searchBar}>
          <DropDown
            onSaveRegionData={saveRegionDataHandler}
            selectedRegion={selectedRegion}
          />
          <input
            id="summoner"
            type="text"
            placeholder="Enter a summoner name"
            value={summonerName}
            onChange={summonerNameChangeHandler}
          />
          <button type="submit">
            <IconContext.Provider value={{ color: "white", size: "30px" }}>
              <BiSearchAlt />
            </IconContext.Provider>
          </button>
        </form>

        {/* Display example search button */}
        {exampleSearch ? (
          <button
            onClick={() => window.location.reload()}
            className={classes.exampleSearch}
          >
            Clear example search
          </button>
        ) : (
          <button
            onClick={exampleSearchSubmitHandler}
            className={classes.exampleSearch}
          >
            Click for example search
          </button>
        )}
      </>
    );
  };
export default SearchForm;
