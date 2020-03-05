import React from "react";
import "./style.css";

function SearchItem(props) {
  let authors = props.authors.join(" and ")

  return <div>
      <h1 className="title-size col s10 offset-s1 center">{props.title}</h1><span className="author-size col s10 offset-s1 center">by&nbsp;{authors}</span>
      <p className="desc-size col s10 offset-s1 center">{props.description}</p>
      <a className="top-push col s10 offset-s1 center" href={props.link} target="_blank" rel="noopener noreferrer">
        <img src={props.image} alt={props.title} />
      </a>
      <button className="top-push col s6 offset-s3 center btn btn-success" onClick={() => props.saveBook(props.book)}>Save Book</button>
    </div>;
}

export default SearchItem;
