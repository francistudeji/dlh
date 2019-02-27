import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase, db } from "../auth/firebase";
import { Redirect } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      displayName: "",
      email: "",
      password: "",
      error: null,
      currentUsername: "",
      currentScreen: "",
      to: null
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { firstName, lastName, displayName, email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        db.ref("users/")
          .push({
            firstName,
            lastName,
            displayName,
            email
          })
          .then(res => {
            this.redirecToForum();
          })
          .catch(err => {
            this.setState({ error: err.message }, () => {
              setTimeout(() => this.setState({ error: null }), 3000);
            });
            window.scrollTo(0, 0);
          });
      })
      .catch(err => {
        this.setState({ error: err.message }, () => {
          setTimeout(() => this.setState({ error: null }), 3000);
        });
        window.scrollTo(0, 0);
      });
  };

  redirecToForum = () => {
    this.setState({ to: "/forum" });
  };

  render() {
    if (this.state.to !== null) return <Redirect to={this.state.to} />;
    return (
      <div className="row my-5">
        <div className="col-xs-12 col sm-10 col-md-6 col-lg-6 mx-auto">
          <div className="card card-body mx-3">
            <h3 className="text-muted text-center">Register</h3>
            {this.state.error !== null && (
              <div className="alert alert-danger">{this.state.error}</div>
            )}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={this.handleChange}
                  placeholder="What is your First Name"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={this.handleChange}
                  placeholder="What is your Last Name"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="displayName">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  id="displayName"
                  onChange={this.handleChange}
                  placeholder="Choose a display name"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.handleChange}
                  placeholder="Type your Email Address"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.handleChange}
                  placeholder="Type a Password"
                  className="form-control"
                  required
                />
              </div>
              <input
                type="submit"
                value="Signup"
                className="btn btn-primary btn-block btn-lg"
              />
            </form>
            <div className="py-5 d-flex justify-content-between">
              <Link to="/login" className="btn-link">
                Login here
              </Link>
              <Link to="/" className="btn-link">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
