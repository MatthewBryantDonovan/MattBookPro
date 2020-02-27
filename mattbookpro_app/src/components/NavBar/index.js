import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function NavBar(props) {

  return     <nav className="">
  <Link className="" to="/">
    Matt Books Pro
  </Link>
  <div>
    <ul className="">
      <li className="">
        <Link to="/" onClick={() => props.currentPageChange("/")} className={
          (props.currentPage === "/" || props.currentPage === "/search")
              ? "nav-link active"
              : "nav-link"  
          }
        >Search </Link>
      </li>
      <li className="nav-item">
        <Link to="/saved" onClick={() => props.currentPageChange("/saved")} className={
          props.currentPage === "/saved" ? "nav-link active" : "nav-link"}
        > Saved </Link>
      </li>
    </ul>
  </div>
</nav>;

}

export default NavBar;
