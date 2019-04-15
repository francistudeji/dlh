import React from "react"
import Navbar from "./Navbar"
import { Link } from "react-router-dom"

const handles = [
  {
    name: "facebook",
    url: "https://facebook.com/ibibiolanguagehub"
  },
  {
    name: "twitter",
    url: "https://twitter.com/ibibiolanguagehub"
  },
  {
    name: "instagram",
    url: "https://instagram.com/ibibiolanguagehub"
  }
]
const Layout = props => {
  return (
    <div className="layout">
      <Navbar />
      <div className="container my-5 mx-auto">{props.children}</div>
      <footer className="bg-dark p-5">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3">
              <h3 className="text-light">Quick Links</h3>
              <ul className="list-group bg-dark">
                <li className="list-group-item bg-dark">
                  <Link className="text-light" to="/">
                    Home
                  </Link>
                </li>
                <li className="list-group-item bg-dark">
                  <Link className="text-light" to="/translate">
                    Translator
                  </Link>
                </li>
                <li className="list-group-item bg-dark">
                  <Link className="text-light" to="/maps">
                    Maps
                  </Link>
                </li>
                <li className="list-group-item bg-dark">
                  <Link className="text-light" to="/ibibio-grammer">
                    Grammar
                  </Link>
                </li>
                <li className="list-group-item bg-dark">
                  <Link className="text-light" to="/forum">
                    Forum
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3">
              <h3 className="text-light">Social Links</h3>

              <ul className="list-group">
                <li className="list-group-item bg-dark d-flex justify-content-between align-items-center">
                  <a
                    rel="noopener norefferer"
                    target="_blank"
                    href="https://facebook.com/ibibiolanguagehub"
                    className="text-light d-flex justify-content-between w-100"
                  >
                    <span>Faceboo</span>k{" "}
                    <i class="fab fa-2x fa-facebook-square ml-auto" />
                  </a>
                </li>
                <li className="list-group-item bg-dark d-flex justify-content-between align-items-center">
                  <a
                    rel="noopener norefferer"
                    target="_blank"
                    href="https://twitter.com/ibibiolanguagehub"
                    className="text-light d-flex justify-content-between w-100"
                  >
                    <span>Twitter</span>{" "}
                    <i class="fab fa-2x fa-twitter-square ml-auto" />
                  </a>
                </li>
                <li className="list-group-item bg-dark d-flex justify-content-between align-items-center">
                  <a
                    rel="noopener norefferer"
                    target="_blank"
                    href="https://instagram.com/ibibiolanguagehub"
                    className="text-light d-flex justify-content-between w-100 "
                  >
                    <span>Instagram</span>{" "}
                    <i class="fab fa-2x fa-instagram ml-auto" />{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
