import React from "react";
import SearchTitle from "../../components/SearchTitle";
import SearchResults from "../../components/SearchResults";
import SearchBar from "../../components/SearchBar";
import SearchItem from "../../components/SearchItem";
import Container from "../../components/Container";
import Row from "../../components/Row";
import { Input, FormBtn } from "../../components/SearchForm";
import API from "../../utils/API";
import "./style.css";

class Search extends React.Component {

  state={
    books: [],
    name: "",
    error: false
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data})
      )
      .catch(err => console.log(err));
  };

  getGoogleBooks = (name) => {
    API.getGoogleBooks(name)
    .then(res => {
      this.setState({ 
        books: res.data,
        error: false
      });
    }
    )
    .catch(err => {
      this.setState({ error: true});
    })
  }

  saveBook = (book) => {
    API.saveBook(
      book
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.name);
    
    if (this.state.name) {
     this.getGoogleBooks(this.state.name);
    }
  };

  render() { 
    return <div>
      <Container>
        <Row>
          <SearchTitle />
        </Row>
      </Container>

      <Container>
        <Row>
          <SearchBar>
            <Input 
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="Book Name"
            />
            <FormBtn
              disabled={!(this.state.name)}
              onClick={this.handleFormSubmit}
            >
              Search for Books
            </FormBtn>
          </SearchBar>
        </Row>
      </Container>

      <Container>
        <SearchResults>
          {
          (!this.state.error) ? 
            ((this.state.books.length > 0) ? 
              (this.state.books.map(book => (
                <Container>
                  <Row>
                    <SearchItem 
                    key={book.link}
                    title={book.title}
                    authors={book.authors}
                    description={book.description}
                    image={book.image}
                    link={book.link}
                    book={book}
                    saveBook={this.saveBook}
                    />
                  </Row>
                </Container>
              ))) :
              (<p className="col s12 teal-text text-darken-3 center">Please Search for books above</p>))
            : 
            (<p className="col s12 teal-text text-darken-3 center">That search didn't have any results!</p>)
          }
        </SearchResults>
      </Container>
      <div className="bottom-space"></div>
    </div>;
  }
}

export default Search;
