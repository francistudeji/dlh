import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Redirect } from "react-router-dom";

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
    view: "new",
    title: "",
    author: "",
    description: "",
    content: "",
    slug: "",
    posts: [],
    redirect: false,
    gname: "",
    gdescription: "",
    gfile: "",
    postmsg: null,
    filemsg: null,
    percentage: null,
    englishWord: "",
    ibibioWord: "",
    dictionarymsg: null
  };

  componentDidMount() {
    const admin = localStorage.getItem("admin");

    if (!admin || admin.token) {
      this.setState({ redirect: true });
    } else {
      axios({
        url: "/api/posts",
        method: "get"
      })
        .then(res => {
          //console.log(res.data);
          this.setState({ posts: [...this.state.posts, ...res.data.posts] });
        })
        .catch(err => console.log({ err }));
    }
  }

  onInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileInputChange = e => {
    this.setState({ gfile: e.target.files[0] });
  };

  onContentInputChange = e => {
    this.setState({
      content: e
    });
  };

  onSubmitFile = e => {
    e.preventDefault();
    const { gname, gdescription, gfile } = this.state;
    const data = new FormData();
    data.append("name", gname);
    data.append("description", gdescription);
    data.append("avatar", gfile);

    const config = {
      onUploadProgress: progressEvent => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        this.setState({ percentage: percentCompleted });
      }
    };

    axios
      .post("/api/resources", data, config)
      .then(res => {
        this.setState({ filemsg: "Success uploading file" });
      })
      .catch(err => {
        this.setState({ filemsg: "Error uploading file" });
      });
    this.setState({
      gname: "",
      gdescription: "",
      gfile: ""
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
            this.setState({ postmsg: res.data.message });
          })
          .catch(err => this.setState({ postmsg: "Error adding post" }));
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

  onSubmitDictionary = e => {
    const { ibibioWord, englishWord } = this.state;

    axios({
      url: "api/dictionaries",
      method: "post",
      data: {
        englishWord,
        ibibioWord
      }
    })
      .then(res => {
        this.setState({ dictionarymsg: res.data.message });
      })
      .catch(err =>
        this.setState({ dictionarymsg: "Error adding words to dictionary" })
      );
    this.setState({
      englishWord: "",
      ibibioWord: ""
    });
  };

  logout = () => {
    this.setState({ redirect: true }, () => localStorage.removeItem("admin"));
  };

  toggleCreate = view => {
    this.setState({ view });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/admin/login" />;
    }
    return (
      <div className="admin-home">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-danger"
          style={{ borderBottom: "1px solid #f00" }}
        >
          <div className="container">
            <Link className="navbar-brand" to="/">
              <h4>
                <strong>ILH</strong>{" "}
                <em style={{ fontSize: "1.2rem" }}>Dashboard</em>
              </h4>
            </Link>

            <div
              className="btn-group ml-auto"
              role="group"
              aria-label="Authentication"
            >
              <button className="btn btn-dark" onClick={this.logout}>
                Logout
              </button>
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
                    onClick={() => this.toggleCreate("new")}
                  >
                    New
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link text-light btn btn-danger"
                    onClick={() => this.toggleCreate("grammer")}
                  >
                    Grammer
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link text-light btn btn-danger"
                    onClick={() => this.toggleCreate("posts")}
                  >
                    Posts{" "}
                    <div className="badge badge-light">
                      {this.state.posts.length > 0
                        ? this.state.posts.length
                        : null}
                    </div>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link text-light btn btn-danger"
                    onClick={() => this.toggleCreate("dictionary")}
                  >
                    Dictionary{" "}
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
            {this.state.view === "new" ? (
              <div className="create" style={{ marginBottom: 100 }}>
                <div className="row">
                  <div className="col-12">
                    <h3 className="mt-3">Create a New Blog Post</h3>
                    <div className="card card-body my-3">
                      {this.state.postmsg !== null ? (
                        <div className="alert alert-success alert-dismissable">
                          {this.state.postmsg}
                        </div>
                      ) : null}
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
            ) : null}

            {this.state.view === "posts" ? (
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
                    {this.state.posts.length !== 0
                      ? this.state.posts.map((post, i) => (
                          <tr key={post.title}>
                            <th scope="row">{i}</th>
                            <td>{post.title}</td>
                            <td>{post.author}</td>
                            <td>
                              <div className="btn-group">
                                <button
                                  data-id={post._id}
                                  id={post._id}
                                  className="btn btn-primary"
                                >
                                  Edit
                                </button>
                                <button
                                  data-id={post._id}
                                  id={post._id}
                                  className="btn btn-danger"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            ) : null}

            {this.state.view === "grammer" ? (
              <div className="create" style={{ marginBottom: 100 }}>
                <div className="row">
                  <div className="col-12">
                    <h3 className="mt-3">Create a Grammer Resource</h3>
                    <div className="card card-body my-3">
                      {this.state.filemsg !== null ? (
                        <div className="alert alert-success alert-dismissable">
                          {this.state.filemsg}
                        </div>
                      ) : null}
                      <form onSubmit={this.onSubmitFile}>
                        <div className="form-group">
                          <label htmlFor="title">Name</label>
                          <input
                            type="text"
                            name="gname"
                            className="form-control"
                            placeholder="Name of file"
                            required
                            onChange={this.handleInputChange}
                            value={this.state.gname}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Meta Description</label>
                          <textarea
                            name="gdescription"
                            className="form-control"
                            placeholder="Type meta description here"
                            required
                            onChange={this.handleInputChange}
                            value={this.state.gdescription}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="content">Content</label>
                          <input
                            type="file"
                            name="gfile"
                            className="form-control"
                            required
                            onChange={this.handleFileInputChange}
                          />
                        </div>
                        <div className="form-group text-center">
                          {this.state.percentage !== null ? (
                            <p className="lead">
                              {this.state.percentage + "%"}
                            </p>
                          ) : null}
                        </div>
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
            ) : null}

            {this.state.view === "dictionary" ? (
              <div className="dictionary-create">
                <div className="row">
                  <div className="col-12">
                    <h3 className="mt-3">Dictionary</h3>
                    <div className="card card-body my-3">
                      {this.state.dictionarymsg !== null ? (
                        <div className="alert alert-success alert-dismissable">
                          {this.state.dictionarymsg}
                        </div>
                      ) : null}
                      <form onSubmit={this.onSubmitDictionary}>
                        <div className="form-group">
                          <label htmlFor="englishWord">Word in English</label>
                          <input
                            type="text"
                            name="englishWord"
                            className="form-control"
                            placeholder="Word in English"
                            required
                            onChange={this.handleInputChange}
                            value={this.state.englishWord}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="ibibioWord">Word in Ibibio</label>
                          <input
                            type="text"
                            name="ibibioWord"
                            className="form-control"
                            placeholder="Word in Ibibio"
                            required
                            onChange={this.handleInputChange}
                            value={this.state.ibibioWord}
                          />
                        </div>

                        <input
                          type="submit"
                          value="Submit"
                          className="btn btn-danger btn-block btn-lg mt-5 mb-3"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </main>
      </div>
    );
  }
}

export default AdminHome;
