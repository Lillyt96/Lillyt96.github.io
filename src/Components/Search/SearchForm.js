import React, { useRef } from "react";
import DropDown from "../UI/DropDown";
import classes from "./SearchForm.module.css";
import { IconContext } from "react-icons";
import {BiSearchAlt} from "react-icons/bi";


var enteredRegion;

const saveRegionDataHandler = (data) => {
  enteredRegion = data;
};

const NewSearch = (props) => {
  const userInputRef = useRef();

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    console.log("button pressed");

    const enteredUser = userInputRef.current.value;
    userInputRef.current.value = "";

    const search = {
      user: enteredUser,
      region: enteredRegion,
    };

    props.onSaveSearch(search);
  };

  return (
    <>
      <div>
        <form onSubmit={searchSubmitHandler} className={classes.searchBar}>
          <DropDown onSaveRegionData={saveRegionDataHandler} />
          <label htmlFor="User" />
          <input
            id="user"
            type="text"
            placeholder="Enter a summoner name"
            ref={userInputRef}
          />
          <button type="submit">
            <IconContext.Provider
              value={{ color: "white", size: "30px"}}
            >
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

export default NewSearch;
