import React from "react";
{
  /* <li key={index}>
  <div>{message.senderId}</div>
  <div>{message.text}</div>
</li> */
}
const MessageList = props => {
  console.log(props);
  return (
    <div className="MessageList">
      {props.messages.map((message, index) => {
        return (
          <div className="card card-body mb-2" key={index}>
            <div className="user-name">
              <div className="row">
                <div className="col-8">
                  <p>
                    <strong>{message.senderId}</strong>-{" "}
                    <small className="text-muted">30mins ago</small>
                  </p>
                </div>
                <div className="col-4">
                  <p className="ml-auto float-right text-danger">3 comments</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="user-message">
              <p className="lead">{message.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
