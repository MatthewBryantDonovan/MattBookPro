import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function NavBar(props) {

  return     <nav className="">
    <div className="nav-wrapper teal">
    <Link id="brand-logo-title" className="brand-logo" to="/">
    Matt Books Pro
  </Link>
      <ul id="nav-mobile" className="right">
        <li><Link to="/" onClick={() => props.currentPageChange("/")} className={
          (props.currentPage === "/" || props.currentPage === "/search")
              ? "nav-link active"
              : "nav-link"  
          }
        >Search </Link></li>
        <li>        <Link to="/saved" onClick={() => props.currentPageChange("/saved")} className={
          props.currentPage === "/saved" ? "nav-link active" : "nav-link"}
        > Saved </Link></li>
      </ul>
    </div>
  </nav>



}

export default NavBar;
