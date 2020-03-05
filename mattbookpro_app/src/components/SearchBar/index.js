import React from "react";
import "./style.css";

function SearchBar({ children }) {

  return <div className="col s12 teal-text text-darken-3"><h1 className="center">Enter Book to Search</h1>{ children }</div>;
}

export default SearchBar;
