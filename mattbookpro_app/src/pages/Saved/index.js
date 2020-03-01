import React from "react";
import SavedTitle from "../../components/SavedTitle";
import SavedBody from "../../components/SavedBody";
import SavedItem from "../../components/SavedItem";
import API from "../../utils/API"

class Saved extends React.Component {

  state={
    books: []
  }

  componentDidMount() {
    this.loadBooks();
    
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteBook = (key) => {
    API.deleteBook(
      key
    )
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  }

  render() { 
  return <div>
      <SavedTitle />
      <SavedBody>
        {this.state.books.map(book => (
        <SavedItem 
          key={book._id}
          id={book._id}
          title={book.title}
          authors={book.authors}
          description={book.description}
          image={book.image}
          link={book.link}
          date={book.date}
          deleteBook={this.deleteBook}
        />))}
      </SavedBody>
    </div>;
  }
}

export default Saved;
