import React, { Component } from "react";
import Layout from "../layout/Layout";
import MessageList from "../message/MessageList";
import { firebase } from "../auth/firebase";
import { Redirect } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const App = {
  modules: {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"]
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
    "image"
  ]
};

class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserName: "",
      currentUserEmail: "",
      currentUser: {},
      currentRoom: {},
      messages: [],
      text: "",
      attachment: null,
      redirect: false,
      isLoggedIn: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        console.log(user, "from forum");
        this.getUserProfile(user.email);
        this.getMessages();
      } else {
        this.setState({ redirect: true });
      }
    });
  }

  getUserProfile = email => {
    let currentUser;

    const mess = firebase.database().ref("users/");
    mess.on("value", snapshot => {
      snapshot.forEach(child => {
        if (email === child.val().email) {
          currentUser = { ...child.val() };
        }
      });
      this.setState({ currentUser }, () => {
        console.log(this.state);
      });
    });
  };

  onChange = e => {
    this.setState({
      text: e
    });
  };

  sendMessage = () => {
    console.log(this.state.text, this.state.currentUser.email);
    const timestamp = new Date().toDateString();
    firebase
      .database()
      .ref("messages/")
      .push({
        text: this.state.text,
        user: this.state.currentUser.email,
        timestamp
      });
  };

  getMessages = () => {
    const mess = firebase.database().ref("messages/");
    mess.on("value", snapshot => {
      let newMessages = [];
      snapshot.forEach(child => {
        let message = child.val();
        newMessages.push({
          id: child.key,
          text: message.text,
          user: message.user,
          timestamp: message.timestamp
        });
      });
      this.setState({ messages: newMessages.reverse() });
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.sendMessage();
    this.getMessages();
  };

  // logout = () => {
  //   firebase.auth().signOut();
  // };

  render() {
    if (this.state.redirect) return <Redirect to="/login" />;
    return (
      <div>
        <div className="modal" tabIndex="-1" role="dialog" id="exampleModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">What is happening</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.onSubmit}>
                  {/* <textarea
                    className="form-control"
                    value={this.state.text}
                    onChange={this.onChange}
                    placeholder="Type to send message"
                    name="text"
                  /> */}
                  <div className="form-group">
                    <ReactQuill
                      className="form-control"
                      value={this.state.text}
                      onChange={e => this.onChange(e)}
                      formats={App.formats}
                      modules={App.modules}
                      style={{ minHeight: 200 }}
                      placeholder="Type to send message"
                      name="text"
                    />
                  </div>
                  <br />
                  <br />
                  <br />
                  <input
                    type="submit"
                    className="btn btn-danger btn-block mt-2"
                    value="Post"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>

        <Layout>
          <div className="row mt-3">
            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto">
              {this.state.messages.length > 0 ? (
                <MessageList
                  messages={this.state.messages}
                  currentUser={this.state.currentUser}
                />
              ) : (
                <div className="div text-center w-100 mt-5">
                  <div class="spinner-grow text-danger" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <nav
            className="navbar navbar-light fixed-bottom pb-3"
            style={{ background: "transparent" }}
          >
            <div className="container">
              <button
                type="button"
                className="btn btn-danger btn-rounded btn-lg"
                id="post"
                style={{ display: "block", margin: "0 0 0 auto" }}
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Post
              </button>
            </div>
          </nav>
        </Layout>
      </div>
    );
  }
}
export default Forum;
