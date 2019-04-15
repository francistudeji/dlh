import React, { Component } from "react"
import { Link } from "react-router-dom"
import { firebase } from "../auth/firebase"

class Navbar extends Component {
  state = {
    isLoggedIn: false
  }

  componentDidMount() {
    let listener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isLoggedIn: true
        })
        listener()
      } else {
        this.setState({
          isLoggedIn: false
        })
        listener()
      }
    })
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger mb-2">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src="/logo.jpg"
              alt="Logo"
              height="50"
              style={{ display: "inline-block" }}
            />
            <h4
              style={{
                display: "inline-block",
                marginTop: "16px",
                marginLeft: "10px",
                marginRight: "10px"
              }}
            >
              Ibibio Language Hub
            </h4>
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
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
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
                <Link className="nav-link" to="/ibibio-grammer">
                  Grammar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/forum">
                  Forum
                </Link>
              </li>
            </ul>
            <div
              className="btn-group ml-auto"
              role="group"
              aria-label="Authentication"
            >
              {this.state.isLoggedIn ? (
                <div className="btn-group">
                  <button
                    className="btn btn-danger"
                    onClick={e => {
                      firebase.auth().signOut()
                      this.setState({ isLoggedIn: false })
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="btn-group">
                  <Link to="/register" className="btn btn-danger">
                    Register
                  </Link>
                  <Link className="btn btn-primary" to="/login">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
export default Navbar
