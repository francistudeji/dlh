import React, { Component } from "react";
import axios from "axios";
import {isAdminAuthenticated} from '../lib/authenticate'
import {Redirect} from 'react-router-dom'

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passwordOne: "",
      passwordTwo: "",
      error: null,
      admin: null,
      redirect: false
    };
  }

  componentDidMount() {
    const admin = localStorage.getItem('admin')

    if (admin) {
      this.setState({ redirect: true })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, passwordOne, passwordTwo } = this.state;
    if (passwordOne !== passwordTwo) {
      this.setState({ error: "Passwords do not match" }, () => {
        this.setState({ username: "", passwordOne: "", passwordTwo: "" });
      });
      return false;
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/api/admin/login",
        data: {
          email,
          password: passwordOne
        }
      })
        .then(res => {
          if (res.data.status !== 200) {
            this.setState({ error: res.data.message });
          }
          this.setState({ admin: res.data.admin, redirect: true }, () => {
            localStorage.setItem("admin", res.data.admin);
          });
        })
        .catch(err => {
          this.setState({ error: "Unable to authenticate" });
        });
    }
  };

  dismiss = () => {
    this.setState({ dismissed: true });
  };

  render() {
    const { email, passwordOne, passwordTwo, error, redirect } = this.state;
    if(redirect) {
      return <Redirect to="/admin/home" />
    }
    return (
      <div className="row mt-5">
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mx-auto">
          <form className="mt-5 px-2" onSubmit={this.handleSubmit}>
            {error !== null ? (
              <div className="alert alert-danger">{error}</div>
            ) : null}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                value={email}
                className="form-control"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordOne">Password</label>
              <input
                type="password"
                name="passwordOne"
                id="passwordOne"
                placeholder="Enter Your password"
                value={passwordOne}
                className="form-control"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordTwo">Confirm Password</label>
              <input
                type="password"
                name="passwordTwo"
                id="passwordTwo"
                placeholder="Repeat Your password"
                value={passwordTwo}
                className="form-control"
                onChange={this.handleChange}
                required
              />
            </div>
            <input
              type="submit"
              value="Login"
              className="btn btn-primary btn-block btn-lg"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default AdminLogin;
