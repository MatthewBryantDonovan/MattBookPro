import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/NavBar'
import Saved from './pages/Saved/index.js'
import Search from './pages/Search/index.js'
import './App.css';

class App extends React.Component {

  state = {
    currentPage: "/",
    data: [{
      authors: ["Suzanne Collins"],
      description: "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
      image: "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      link: "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
      title: "The Hunger Games"
    },
    {
      authors: ["JK R"],
      description: "t Katniss has been close to death before. For her, survival is second nature.",
      image: "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      link: "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
      title: "The Harry Potter Boi"
    }]
  }

  currentPageChange = (page) => {
    this.setState({
      currentPage: page
    })
  }


  render() { 
    return (
      <Router>
        <div>
          <Navbar 
            currentPageChange={this.currentPageChange} 
            currentPage={this.state.currentPage}
          />
          <Route exact path="/" component={Search} />
          <Route exact path="/saved" component={Saved} />
        </div>
      </Router>
    );
  }
}

export default App;
