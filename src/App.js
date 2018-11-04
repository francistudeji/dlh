import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Forum from "./components/pages/Forum";
import Login from "./components/auth/Login"

import "./App.css";

import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";

function onAuthRequired({ history }) {
  history.push("/login");
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security
          issuer="https://dev-107219.oktapreview.com/oauth2/default"
          client_id="0oah72j1c4mEWzBVu0h7"
          redirect_uri={window.location.origin + "/implicit/callback"}
          onAuthRequired={onAuthRequired}
        >
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={Home} />
              <SecureRoute exact path="/forum" component={Forum} />
              <Route
                exact
                path="/login"
                render={() => (
                  <Login baseUrl="https://dev-107219.oktapreview.com" />
                )}
              />
            </Switch>
          </React.Fragment>
        </Security>
      </Router>
    );
  }
}

export default App;
