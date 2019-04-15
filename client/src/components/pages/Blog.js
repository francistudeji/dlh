import React, { Component } from "react";
import { getPost } from "../../actions";
import { connect } from "react-redux";
import Layout from "../layout/Layout";
import format from "date-fns/format";
import axios from "axios";
import { Link } from "react-router-dom";
import renderHTML from "react-render-html";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      posts: [],
      slug: "",
      currentPost: {}
    };
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    const id = this.props.match.params.id;

    this.findPostById(id);
    this.setState({ id, slug }, () => {
      getPost(id)
    });
  }

  findPostById = id => {
    axios({
      url: `/api/posts/${id}`,
      method: "get"
    })
      .then(res => {
        this.setState({ posts: [...this.state.posts, res.data.post] });
      })
      .catch(err => console.log({ err }));
  };

  render() {
    return (
      <Layout>
        <div className="row">
          {this.state.posts.length > 0 ? (
            this.state.posts.map(post => (
              <div
                className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto px-5"
                key={post.slug}
              >
                <Link to="/" className="btn btn-outline-danger mb-3">
                  &larr; Back Home
                </Link>
                <br />
                <h1 className="mb-3">{post.title}</h1>
                <div className="mb-3">
                  <em className="text-muted">{post.description}</em>
                </div>
                <div className="mb-4 text-muted">
                  By <span className="text-danger">{post.author}</span> |{" "}
                  {format(post.createdAt, "Do MMMM YYYY")}
                </div>
                <div className="lead">{renderHTML(post.content)}</div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center mx-auto">
              <p className="h1 lead mt-5 ">Loading...</p>
            </div>
          )}
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
  { getPost }
)(Blog);
