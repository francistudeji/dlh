import React, { Component } from "react";
//actions
import { setPosts } from "../../actions";
//REDUX
import { connect } from "react-redux";
import PostCard from "../post";
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
    this.listen = this.props.history.listen((loc, action) => {
      console.log(loc, action);
    });
    this.props.setPosts();
    const slug = this.props.match.params.slug;
    const id = this.props.match.params.id;

    this.findPostById(id);
    this.setState({ id, slug }, () => {
      console.log(this.state);
    });
  }

  findPostById = id => {
    axios({
      url: `/api/posts/${id}`,
      method: "get"
    })
      .then(res => {
        this.setState({ posts: [...this.state.posts, res.data] });
      })
      .catch(err => console.log({ err }));
  };

  render() {
    return (
      <Layout>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 mx-auto" />
          {this.state.posts.length > 0 ? (
            this.state.posts.map(post => (
              <div className="row px-5" key={post.slug}>
                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto">
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
              </div>
            ))
          ) : (
            <p>loading...</p>
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
  { setPosts }
)(Blog);
