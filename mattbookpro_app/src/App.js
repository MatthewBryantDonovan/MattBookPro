import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/NavBar'
import Saved from './pages/Saved/index.js'
import Search from './pages/Search/index.js'
import './App.css';

class App extends React.Component {

  state = {
    currentPage: "/"
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
