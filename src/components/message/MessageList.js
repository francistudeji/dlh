import React from "react";
import { distanceInWords } from "date-fns";

const MessageList = props => {
  //console.log(distanceInWords(new Date(2016, 0, 1), new Date(2015, 0, 1)));
  return (
    <div className="MessageList">
      {props.messages.map((message, index) => {
        return (
          <div className="card card-body mb-2" key={index}>
            <div className="user-name">
              <div className="row">
                <div className="col-8">
                  <p>
                    <strong>@{message.senderId}</strong> {" "}
                    <small className="text-muted">{distanceInWords(message.updatedAt, new Date().toISOString())}</small>
                  </p>
                </div>
                <div className="col-4">
                  <p className="ml-auto float-right text-danger">3 comments</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="user-message" style={{ width: "100%" }}>
              <p className="lead">{message.text}</p>
              {message.attachment ? (
                <img
                  style={{ maxWidth: "100%" }}
                  className="img-responsive"
                  src={message.attachment.link}
                  alt={message.attachment.type}
                />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
