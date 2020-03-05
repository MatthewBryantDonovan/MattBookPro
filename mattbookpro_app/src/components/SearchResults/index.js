import React from "react";
import "./style.css";

function SearchResults({ children }) {

  return <div className="col s12 teal-text text-darken-3"><h1 className="center">Results</h1>{ children }</div>;
}

export default SearchResults;
