import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/";
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Privacy from "./pages/Privacy";
import Secret from "./pages/Secret";

class App extends Component {
  state = {};

  componentDidMount() {
    // $('.sidenav').sidenav();
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/secret" component={Secret} />
            <Route exact path="/privacy" component={Privacy} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
