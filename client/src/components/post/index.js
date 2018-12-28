import React from "react";
import { Link } from "react-router-dom";
import format from "date-fns/format";

export default function PostCard(props) {
  const { _id, slug, title, author, createdAt, description } = props.posts;
  return (
    <div
      className="col-xs-12 col-sm-12 col-md-6 col-lg-4 d-flex align-items-stretch"
    >
      <div className="card mb-3 ">
        <div className="card-body">
          <Link
            to={`/blog/${slug}`}
            className="text-dark"
            style={{ textDecoration: "none" }}
          >
            <h5 className="card-title mb-3">{title}</h5>
          </Link>
          <h6 className="card-subtitle mb-3 text-muted">
            By {author} on {format(createdAt, "Do MMMM YYYY")}
          </h6>
          <p className="card-text mb-4">
            {String(description).substr(0, 100) + "..."}
          </p>
          <br />
          <Link
            style={{
              position: "absolute",
              left: "15px",
              bottom: "15px"
            }}
            to={`/blog/${_id}/${slug}`}
            className="card-link btn btn-outline-danger"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
