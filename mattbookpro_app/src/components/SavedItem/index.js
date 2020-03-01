import React from "react";

function SavedItem(props) {
  let authors = props.authors.join(" and ")

  return <div>
      <h1>{props.title}</h1><span>by&nbsp;{authors}</span>
      <p>{props.description}</p>
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <img src={props.image} alt={props.title} />
      </a>
      <button onClick={() => props.deleteBook(props.id)}>Delete Book</button>
    </div>;
}

export default SavedItem;
