import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import { withAuth } from "@okta/okta-react";

export default withAuth(
  class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        authenticated: null
      };
    }

    async checkAuthentication() {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    componentDidMount() {
      this.checkAuthentication();
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    login = async () => {
      this.props.auth.login("/");
    };

    logout = async () => {
      this.props.auth.logout("/");
    };

    render() {
      if (this.state.authenticated === null) return null;

      const content = this.state.authenticated ? (
        <div>
          <p className="lead">You are logged in </p>
          <button className="btn btn-default" onClick={this.logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p className="lead">You are not logged in </p>
          <button className="btn btn-default" onClick={this.login}>
            Login
          </button>
        </div>
      );
      return (
        <div>
          <Navbar />
          <div className="container">
            <h1>Home</h1>
            {content}
          </div>
        </div>
      );
    }
  }
);
