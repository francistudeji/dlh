import React, { Component } from 'react';

class AdminLogin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      passwordOne: "",
      passwordTwo: "",
      error: null
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, passwordOne, passwordTwo } = this.state
    if(passwordOne !== passwordTwo) {
      this.setState({error: 'Passwords do not match'}, () => {
        this.setState({username: '', passwordOne: '', passwordTwo: ''})
      })
      return false;
    }

    console.log(this.state)

  }

  render() {
    const { username, passwordOne, passwordTwo, error } = this.state
    return (
      <div className="row mt-5">
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mx-auto">
          <form className="mt-5 px-2" onSubmit={this.handleSubmit}>
            {error !== null ? (<div className="alert alert-danger">{error}</div>) : ''}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter Your Username or email"
                value={username}
                className="form-control"
                onChange={this.handleChange}
                required
                />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="passwordOne"
                placeholder="Enter Your password"
                value={passwordOne}
                className="form-control"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                name="passwordTwo"
                placeholder="Enter Your password"
                value={passwordTwo}
                className="form-control"
                onChange={this.handleChange}
                required
              />
            </div>
            <input type="submit" value="Login" className="btn btn-primary btn-block btn-lg" />
          </form>
        </div>
      </div>
    );
  }
}

export default AdminLogin;