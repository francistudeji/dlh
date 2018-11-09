import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import { withAuth } from "@okta/okta-react";

export default withAuth(
  class Forum extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentUsername: '',
        currentUserEmail: ''
      };
    }

    componentDidMount() {
      const idToken = JSON.parse(localStorage.getItem('okta-token-storage'))
      this.setState({
        currentUsername: idToken.idToken.claims.name,
        currentUserEmail: idToken.idToken.claims.email
      })
    }

    logout = async () => {
      this.props.auth.logout("/");
    };

    render() {
      return (
        <div>
          <Navbar />
          <div className="container">
            <h1>Hi, {this.state.currentUsername}</h1>
            <h3>Your email is: {this.state.currentUserEmail}</h3>
            <button className="btn btn-default" onClick={this.logout}>
              Logout
            </button>
          </div>
        </div>
      );
    }
  }
);
