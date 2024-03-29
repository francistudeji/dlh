import React, { Component } from "react"
import { Link } from "react-router-dom"
import Layout from "../layout/Layout"
import axios from "axios"

//actions//
import { setPosts } from "../../actions"
//REDUX
import { connect } from "react-redux"
import PostCard from "../post"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      loading: true
    }
  }

  getPosts = () => {
    axios({
      url: "/api/posts",
      method: "get"
    })
      .then(res => {
        this.setState({ posts: [...this.state.posts, ...res.data.posts] })
      })
      .catch(err => console.log({ err }))
  }

  componentDidMount() {
    this.props.setPosts()
  }

  render() {
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
                className="img-responsive mt-2 mx-auto"
                src="/showcase2.png"
                alt="showcase"
                style={{ width: "400px", objectFit: "cover" }}
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
                  borderBottom: "4px solid #7f3f01",
                  display: "inline-block"
                }}
              >
                Latest Blog Posts
              </h1>
            </div>
            <hr />
          </div>

          {this.props.posts.length > 0 ? (
            this.props.posts.map(post => (
              <PostCard key={post._id} posts={post} />
            ))
          ) : (
            <p className="h1 lead text-center mx-auto">Loading...</p>
          )}
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    isLoading: state.isLoading
  }
}

export default connect(
  mapStateToProps,
  { setPosts }
)(Home)
