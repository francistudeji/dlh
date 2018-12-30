import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";

export default withAuth(class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication();
  }

  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  };

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;
    const authLinks = this.state.authenticated ? (
      <div className="btn-group">
        <Link to="/profile" className="btn btn-default">Profile</Link>
        <a
          className="btn btn-primary"
          href="javascript:void(0)"
          onClick={() => this.props.auth.logout()}
        >
          Logout
        </a>
      </div>
    ) : (
        <div className="btn-group">
          <Link to="/register" className="btn btn-danger">Register</Link>
          <a
            className="btn btn-primary"
            href="javascript:void(0)"
            onClick={() => this.props.auth.login()}
          >
            Login
        </a>
        </div>
    )
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger mb-2">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <h4>Dakata Language Hub</h4>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/translate">
                  Translator
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/maps">
                  Maps
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/forum">
                  Forum
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li> */}
            </ul>
            <div
              className="btn-group ml-auto"
              role="group"
              aria-label="Authentication"
            >
              {authLinks}
            </div>
          </div>
        </div>
      </nav>
    );
  }
})
