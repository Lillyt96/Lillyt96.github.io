import React from "react";
import SearchForm from "./Components/Search/SearchForm";
import getOpggUrl from "./Components/Search/RetrieveData";

function App() {
  console.log(getOpggUrl("5he", "RGAPI-cc590900-ec25-4b9e-bc88-1dfe6507eba2"))
  return (
    <div>
      <SearchForm />
    </div>
  );
}

export default App;
