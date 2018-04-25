import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

class App extends Component {
  render() {

    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;