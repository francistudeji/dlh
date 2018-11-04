import React, { Component } from "react";
import OktaSignIn from "@okta/okta-signin-widget";
import ReactDOM from 'react-dom'
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import "@okta/okta-signin-widget/dist/css/okta-theme.css";

class SignInWidget extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this)
    this.widget = OktaSignIn({
      baseUrl: this.props.baseUrl
    })
  }

  render() {
    return <div />;
  }
}

export default SignInWidget;
