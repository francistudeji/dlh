import React, { Component, lazy, Suspense } from "react";
import { withAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import axios from "axios";
import { store } from '../../index'

//actions//
import { setPosts } from "../../actions";
//REDUX
import { connect } from "react-redux";
import PostCard from  "../post"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
      posts: [],
      loading: true
    };
  }

  getPosts = () => {
    axios({
      url: "/api/posts",
      method: "get"
    })
      .then(res => {
        this.setState({ posts: [...this.state.posts, ...res.data.posts] });
      })
      .catch(err => console.log({ err }));
  };

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidMount() {
    this.checkAuthentication();
    this.props.setPosts()
    //console.log(this.props)
  }

  login = async () => {
    this.props.auth.login("/");
  };

  logout = async () => {
    this.props.auth.logout("/");
  };

  render() {
    //console.log(store.getState())
    if (this.state.authenticated === null) return null;

    return (
      <Layout>
        <div className="row mt-5">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <div className="headline-text mt-2" style={{ overflow: "hidden" }}>
              <h1 className="text-dark hero-text" style={{ fontSize: "4rem" }}>
                Where Communication Happens
              </h1>
              <p className="lead">
                When you and your friends need to kick off a conversation,
                translate between languages, read blog posts, share files and
                resources, observe maps and more{" "}
                <strong className="text-danger" title="Dakada Language Hub">
                  ILH
                </strong>{" "}
                has you covered.
              </p>
              <div className="register my-3">
                <Link className="btn btn-danger btn-lg mb-3" to="/register">
                  Create My Account
                </Link>
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 text-center">
            <div className="headline-image mt-5">
              <img
                className="img-responsive mt-2"
                src="/showcase.png"
                alt="showcase"
                style={{ width: "400px", maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mx-auto">
            <div className="heading-text mx-auto text-center mt-4">
              <h1
                className="my-5 pb-2 text-dark text-center"
                style={{
                  borderBottom: "4px solid #dc3545",
                  display: "inline-block"
                }}
              >
                Latest Blog Posts
              </h1>
            </div>
            <hr />
          </div>

          {this.props.posts.length > 0
            ? this.props.posts.map(post => (
              <PostCard key={post._id} posts={post} />
            ))
              : <p className="h1 lead text-center mx-auto">Loading...</p>
            }
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    isLoading: state.isLoading
  };
}

export default connect(
  mapStateToProps,
  { setPosts }
)(withAuth(Home));