import React, { Component } from "react";
import { withAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import axios from "axios";
import format from "date-fns/format";

export default withAuth(
  class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        authenticated: null,
        posts: []
      };
    }

    getPosts = () => {
      axios({
        url: "http://localhost:4000/api/posts",
        method: "get"
      })
        .then(res => {
          //console.log(res.data);
          this.setState({ posts: [...this.state.posts, ...res.data] });
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
      this.getPosts();
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

      return (
        <Layout>
          <div className="row mt-5">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
              <div className="headline-text mt-2" style={{overflow: 'hidden'}}>
                <h1 className="text-dark hero-text" style={{ fontSize: "4rem" }}>
                  Where Communication Happens
                </h1>
                <p className="lead">
                  When you and your friends need to kick off a conversation,
                  translate between languages, read blog posts, share files and
                  resources, observe maps and more{" "}
                  <strong className="text-danger" title="Dakada Language Hub">
                    DLH
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
                  style={{ width: "400px", maxWidth: '100%' }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mx-auto">
              <div className="heading-text mx-auto text-center mt-4">
                <h1
                  className="my-5 pb-2 text-dark text-center"
                  style={{ borderBottom: "4px solid #dc3545", display: 'inline-block' }}
                  >
                  Latest Blog Posts
                </h1>
              </div>
              <hr />
            </div>

            {this.state.posts
              ? this.state.posts.map(post => (
                  <div
                    key={post._id}
                    className="col-xs-12 col-sm-12 col-md-6 col-lg-4 d-flex align-items-stretch"
                  >
                    <div className="card mb-3 ">
                      <div className="card-body">
                        <Link to={`/blog/${post.slug}`} className="text-dark" style={{textDecoration: 'none'}}>
                          <h5 className="card-title mb-3">{post.title}</h5>
                        </Link>
                        <h6 className="card-subtitle mb-3 text-muted">
                          By {post.author} on {format(post.createdAt, 'Do MMMM YYYY')}
                        </h6>
                        <p className="card-text mb-4">
                          {String(post.description).substr(0, 100) + '...'}
                        </p>
                        <br />
                        <Link
                          style={{
                            position: 'absolute',
                            left: '15px',
                            bottom: '15px'
                          }}
                          to={`/blog/${post.slug}`}
                          className="card-link btn btn-outline-danger"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </Layout>
      );
    }
  }
);
