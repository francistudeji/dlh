import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/pages/Home";

import Forum from "./components/pages/Forum";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/forum" component={Forum} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
