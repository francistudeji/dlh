import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import { withAuth } from "@okta/okta-react";
import Chatkit from "@pusher/chatkit";
import messageList from "../message/MessageList";
import MessageList from "../message/MessageList";

export default withAuth(
  class Forum extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentUserName: "",
        currentUserEmail: "",

        currentUser: {},
        currentRoom: {},
        messages: [],
        text: ""
      };
    }

    sendMessage = text => {
      this.state.currentUser.sendMessage({
        text,
        roomId: this.state.currentRoom.id
      });
    };

    initChatkitInstance = async () => {
      let token = JSON.parse(localStorage.getItem("okta-token-storage"));
      //console.log(token.idToken.claims)

      const chatManager = new Chatkit.ChatManager({
        instanceLocator: "v1:us1:3b00ed07-103c-4828-8fd7-271bb696c15d",
        userId: this.state.currentUserEmail,
        tokenProvider: new Chatkit.TokenProvider({
          url: "http://localhost:4000/api/chatkitAuthenticate"
        })
      });

      // chatManager.connect()
      //   .then(cu => {
      //     if(cu) console.log(cu)
      //     console.log('no cu')
      //   })
      //   .catch(error => {
      //     console.log({ error });
      //   });

      // chatManager
      //   .connect()
      //   .then(currentUser => {
      //     console.log(currentUser)
      //     this.setState({ currentUser });
      //     return currentUser.subscribeToRoom({
      //       roomId: 19420332,
      //       messageLimit: 100,
      //       hooks: {
      //         onNewMessage: message => {
      //           this.setState({ messages: [...this.state.messages, message] });
      //           console.log(message);
      //         }
      //       }
      //     });
      //   })
      //   .then(currentRoom => {
      //     this.setState({ currentRoom });
      //     console.log(this.state);
      //   })
      //   .catch(error => {
      //     console.log({ error });
      //   });
    };

    componentDidMount() {
      const idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
      this.setState(
        {
          currentUserName: idToken.idToken.claims.name,
          currentUserEmail: idToken.idToken.claims.email
        },
        () => {
          const chatManager = new Chatkit.ChatManager({
            instanceLocator: "v1:us1:3b00ed07-103c-4828-8fd7-271bb696c15d",
            userId: this.state.currentUserEmail,
            tokenProvider: new Chatkit.TokenProvider({
              url: "http://localhost:4000/api/chatkitAuthenticate"
            })
          });

          chatManager
            .connect()
            .then(currentUser => {
              console.log(currentUser);
              this.setState({ currentUser });
              return currentUser.subscribeToRoom({
                roomId: 19420332,
                messageLimit: 100,
                hooks: {
                  onNewMessage: message => {
                    this.setState({
                      messages: [...this.state.messages, message]
                    });
                    console.log(message);
                  }
                }
              });
            })
            .then(currentRoom => {
              this.setState({ currentRoom });
              console.log(this.state);
            })
            .catch(error => {
              console.log({ error });
            });
        }
      );
    }

    onChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };

    onSubmit = e => {
      e.preventDefault();
      this.state.currentUser.sendMessage({
        text: this.state.text,
        roomId: this.state.currentRoom.id
      });
      this.setState({ text: "" });
    };

    logout = async () => {
      this.props.auth.logout("/");
    };

    render() {
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
                    <textarea
                      className="form-control"
                      value={this.state.text}
                      onChange={this.onChange}
                      placeholder="Type to send message"
                      name="text"
                    />
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

          <Navbar />
          <div className="container">
            {/* <h1>Hi, {this.state.currentUserName}</h1>
            <h3>Your email is: {this.state.currentUserEmail}</h3>
            <button className="btn btn-default" onClick={this.logout}>
              Logout
            </button> */}
            <div className="row mt-3">
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 mx-auto">
                {/* message list */}
                <MessageList messages={this.state.messages} />
              </div>
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
        </div>
      );
    }
  }
);
