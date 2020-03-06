import React from "react";
import SavedTitle from "../../components/SavedTitle";
import SavedBody from "../../components/SavedBody";
import SavedItem from "../../components/SavedItem";
import Container from "../../components/Container";
import Row from "../../components/Row";
import API from "../../utils/API";
import "./style.css";

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
      <Container>
        <Row>
          <SavedTitle/>
        </Row>
      </Container>
      <Container>
        <Row>
          <SavedBody>
            {this.state.books.map(book => (
              <Container>
                 <Row>
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
                  />
                </Row>
              </Container>
            ))}
          </SavedBody>
        </Row>
      </Container>
      <div className="bottom-space"></div>
    </div>;
  }
}

export default Saved;
