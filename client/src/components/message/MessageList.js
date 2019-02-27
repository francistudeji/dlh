import React from "react";
import renderHTML from "react-render-html";
import { distanceInWords } from "date-fns";

const d = "2019-02-27T20:37:49.307Z";
const fmt = date => {
  const dt = String(date);

  const days = dt.split("T")[0];
  const time = dt.split("T")[1];

  const year = Number(days.split("-")[0]);
  const month = Number(days.split("-")[1]);
  const day = Number(days.split("-")[2]);

  const hour = Number(time.split(":")[0]);
  const minute = Number(time.split(":")[1]);
  const second = Number(time.split(":")[2].split(".")[0]);

  return { year, month, day, hour, minute, second };
};

console.log(fmt(d));

const MessageList = ({ messages, currentUser }) => {
  console.log(messages);
  return (
    <div className="message">
      {messages.map(message => (
        <div className="card mb-3" key={message.id}>
          <div className="card-header d-flex justify-content-between">
            <div className="header-left">
              <strong>{`${currentUser.firstName} ${
                currentUser.lastName
              }`}</strong>{" "}
              @{currentUser.displayName}
            </div>
            <div className="header-right">
              <small>
                {distanceInWords(message.timestamp, new Date().toDateString())}{" "}
                ago
              </small>
            </div>
          </div>
          <div className="card-body">{renderHTML(message.text)}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
