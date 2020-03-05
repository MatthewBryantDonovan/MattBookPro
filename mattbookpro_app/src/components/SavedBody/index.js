import React from "react";
import "./style.css";

function SavedBody({ children }) {

  return <div className="col s12 teal-text text-darken-3"><h1 className="center">View or Delete Books Below</h1>{ children }</div>;
}

export default SavedBody;
