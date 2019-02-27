import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { firebase } from "../auth/firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
      redirect: false,
      currentUser: "",
      isLoggedIn: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this.setState({ redirect: true });
      } else {
        console.log("no user from login");
      }
    });
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.setState({ currentUser: user, error: null, redirect: true });
      })
      .catch(err => {
        this.setState({ error: err.message }, () => {
          setTimeout(() => this.setState({ error: null }), 4000);
        });
      });
  };

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to="/forum" />;
    // }

    return (
      <div className="login">
        <div className="row w-100 pt-5">
          <div className="col-xs-12 col-sm-8 col-md-6 col-lg-6 mx-auto pt-5">
            <div className="card card-body py-4">
              <h3 className="text-muted text-center">Login</h3>
              {this.state.error !== null && (
                <div className="alert alert-danger">{this.state.error}</div>
              )}
              <form className="login-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Email Address"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </div>

                <input
                  type="submit"
                  value="Login"
                  className="btn btn-danger btn-block"
                />
                <p className="py-3">
                  Already have an account ? <Link to="/register">Register</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
