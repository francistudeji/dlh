import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Forum from "./components/pages/Forum";
import Translate from "./components/pages/Translate";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Poetry from "./components/pages/Poetry";
import AdminLogin from "./components/pages/AdminLogin";
import AdminHome from "./components/pages/AdminHome";
import Blog from "./components/pages/Blog";
import IbibioGrammer from "./components/pages/IbibioGrammer";
import Maps from "./components/pages/Maps";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/forum" component={Forum} />
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/translate" component={Translate} />
            {/* <Route path="/profile" component={Profile} /> */}
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/home" component={AdminHome} />
            <Route exact path="/blog/:id/:slug" component={Blog} />
            <Route exact path="/maps" component={Maps} />
            <Route exact path="/ibibio-grammer" component={IbibioGrammer} />
            <Route exact path="/poetry" component={Poetry} />

          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
