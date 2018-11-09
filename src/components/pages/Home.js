import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import { withAuth } from "@okta/okta-react";
import { Link } from 'react-router-dom'

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
          <button className="btn btn-default" onClick={this.logout}>
            Logout
          </button>
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
            {/* <h1>Home</h1>
            {content} */}
            <div className="row mt-5" style={{ height: "100vh" }}>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="headline-text mt-5">
                  <h1 style={{ fontSize: '4rem' }}>Where Communication Happens</h1>
                  <p className="lead">
                    When you and your friends need to kick off a conversation, translate between languages, read blog posts, share files and resources, observe maps and more <strong className="text-danger" title="Dakada Language Hub">DLH</strong> has you covered.
                  </p>
                  <div className="register my-3">
                    <Link className="btn btn-danger btn-lg mb-3" to="/register">Create My Account</Link>
                    <p>Already have an account ? <Link to="/login" className="">Login</Link></p>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 text-center">
                <div className="headline-image mt-5">
                  <img
                    className="img-responsive mt-5"
                    src="/showcase.png"
                    alt="showcase"
                    style={{width: '450px'}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
