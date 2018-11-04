import React from 'react';
import {Link} from 'react-router-dom'
const Navbar = props => {
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger mb-2">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h4>Dakata Language Hub</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/translate">
                Translate
                </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">
                Blog
                </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/forum">
                Forum
                </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
                </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
                </Link>
            </li>
          </ul>
          <div
            className="btn-group ml-auto"
            role="group"
            aria-label="Authentication"
          >
          <Link to="/login" className="btn btn-primary">Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;