import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const App = {
  modules: {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
      ["code-block"]
    ]
  },

  formats: [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "code-block"
  ]
};

class AdminHome extends Component {
  state = {
    isCreateView: true,
    title: "",
    author: "",
    description: "",
    content: "",
    slug: "",
    posts: []
  };

  componentDidMount() {

    axios({
      url: "/api/posts",
      method: "get"
    })
    .then(res => {
      //console.log(res.data);
      this.setState({ posts: [...this.state.posts, ...res.data] });
    })
    .catch(err => console.log({ err }));

  }

  onInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onContentInputChange = e => {
    this.setState({
      content: e
    });
  };

  onSubmitPost = e => {
    e.preventDefault();
    this.setState(
      {
        slug: this.state.title
          .trim()
          .toLowerCase()
          .split(" ")
          .join("-")
      },
      () => {
        const { title, author, description, content, slug } = this.state;

        axios({
          url: "api/posts",
          method: "post",
          data: {
            title,
            author,
            description,
            content,
            slug
          }
        })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => console.log({ err }));
        this.setState({
          title: "",
          author: "",
          description: "",
          content: "",
          slug: ""
        });
      }
    );
  };

  toggleCreate = bool => {
    this.setState({ isCreateView: bool });
  };

  render() {
    return (
      <div className="admin-home">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-danger"
          style={{ borderBottom: "1px solid #f00" }}
        >
          <div className="container">
            <Link className="navbar-brand" to="/">
              <h4>
                <strong>DLH</strong>{" "}
                <em style={{ fontSize: "1.2rem" }}>Dashboard</em>
              </h4>
            </Link>

            <div
              className="btn-group ml-auto"
              role="group"
              aria-label="Authentication"
            >
              <Link to="/admin/logout" className="btn btn-danger">
                Logout
              </Link>
            </div>
          </div>
        </nav>
        <header className="content bg-danger">
          <div className="container">
            <div className="row py-2">
              <ul className="nav justify-content-center mx-auto">
                <li className="nav-item">
                  <button
                    className="nav-link active text-light btn btn-danger"
                    onClick={() => this.toggleCreate(true)}
                  >
                    New
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link text-light btn btn-danger"
                    onClick={() => this.toggleCreate(false)}
                  >
                    Posts <div className="badge badge-light">{this.state.posts.length > 0 ? this.state.posts.length: null}</div>
                  </button>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link text-light btn btn-danger">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <main className="main-content">
          <div className="container">
            {this.state.isCreateView ? (
              <div className="create" style={{ marginBottom: 100 }}>
                <div className="row">
                  <div className="col-12">
                    <h3 className="mt-3">Create a New Blog Post</h3>
                    <div className="card card-body my-3">
                      <form onSubmit={this.onSubmitPost}>
                        <div className="form-group">
                          <label htmlFor="title">Title</label>
                          <input
                            type="text"
                            id="title"
                            className="form-control"
                            placeholder="Type blog post title here"
                            required
                            onChange={this.onInputChange}
                            value={this.state.title}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="author">Author</label>
                          <input
                            type="text"
                            id="author"
                            className="form-control"
                            placeholder="Type blog post author here"
                            required
                            onChange={this.onInputChange}
                            value={this.state.author}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Meta Description</label>
                          <textarea
                            id="description"
                            className="form-control"
                            placeholder="Type meta description here"
                            required
                            onChange={this.onInputChange}
                            value={this.state.description}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="content">Content</label>
                          <ReactQuill
                            value={this.state.content}
                            placeholder="Type Post Content"
                            onChange={e => this.onContentInputChange(e)}
                            formats={App.formats}
                            modules={App.modules}
                            style={{ height: 200 }}
                          />
                        </div>
                        <br />
                        <input
                          type="submit"
                          value="Publish"
                          className="btn btn-danger btn-block btn-lg mt-5 mb-3"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="manage">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Author</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.posts.length !== 0 ? (
                        this.state.posts.map((post, i) =>
                        <tr key={post.title}>
                          <th scope="row">{i}</th>
                          <td>{post.title}</td>
                          <td>{post.author}</td>
                          <td>
                            <div className="btn-group">
                              <button data-id={post._id} id={post._id} className="btn btn-primary">Edit</button>
                              <button data-id={post._id} id={post._id} className="btn btn-danger">Delete</button>
                            </div>
                          </td>
                        </tr>)
                      ):null
                    }
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }
}

export default AdminHome;
