import React, { Component } from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";

const config = {
  url: "https://dev-107219.oktapreview.com"
};

export default withAuth(
  class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: "",
        lastName: "",
        displayName: "",
        email: "",
        password: "",
        sessionToken: null,
        errors: [],
        currentUsername: "",
        currentScreen: ""
      };
      this.oktaAuth = new OktaAuth({ url: config.url });
      this.checkAuthentication();
    }

    async checkAuthentication() {
      const sessionToken = await this.props.auth.getIdToken();
      if (sessionToken) {
        this.setState({ sessionToken });
      }
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
      e.preventDefault();
      const newState = { ...this.state };
      fetch("http://localhost:4000/api/newUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newState)
      })
        .then(blob => blob.json())
        .then(res => {
          if (res.status === 400) {
            this.setState({ errors: res.errorCauses });
          }

          // create new chakit user
          this.createNewChatkitUser(this.state.email);

          this.oktaAuth
            .signIn({
              username: this.state.email,
              password: this.state.password
            })
            .then(res => {
              this.setState({
                sessionToken: res.sessionToken
              });
            });
        })
        .catch(err => console.log({ err }));
    };

    createNewChatkitUser = username => {
      fetch("http://localhost:4000/api/newChatkitUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username })
      })
        .then(response => {
          this.setState({
            currentUsername: username,
            currentScreen: "chatScreen"
          });
          console.log({ response });
        })
        .catch(error => {
          console.log({ error });
        });
    };

    render() {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }
      return (
        <div className="row my-5">
          <div className="col-xs-12 col sm-10 col-md-8 col-lg-6 mx-auto">
            <div className="card card-body mx-3">
              {this.state.errors.length !== 0 ? (
                <div className="alert alert-danger">
                  <ul>
                    {this.state.errors.map((err, i) => (
                      <li key={i}>{err.errorSummary}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
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
            </div>
          </div>
        </div>
      );
    }
  }
);
