import React from "react";
import { Link } from "react-router-dom";

export default function ResourceCard(props) {
  const { name, description, langfile } = props.resource;
  const { expanded, toggleView } = props;
  let short = String(description).substr(0, 100) + "...";
  return (
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
      <div className="card mb-3 ">
        <div className="card-body">
          <a
            href={`http://${langfile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-danger"
            style={{ textDecoration: "none" }}
          >
            <h5 className="card-title mb-3">{name}</h5>
          </a>
          <h6 className="card-subtitle mb-3 text-muted">
            Type of file -{" "}
            <strong>
              {
                String(langfile)
                  .toUpperCase()
                  .split(".")
                  .slice(-1)[0]
              }
            </strong>
          </h6>
          <p className="card-text mb-4">
            {expanded ? description : short} <button onClick={toggleView} className="btn text-danger" style={{ background: 'transparent', outline: 'none' }}>{expanded ? "collapse" : "expand"}</button>
          </p>
          <br />
          <a
            style={{
              position: "absolute",
              left: "15px",
              bottom: "15px"
            }}
            href={`http://${langfile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link btn btn-outline-danger"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
