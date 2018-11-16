import React from 'react';
import Navbar from './Navbar'

const Layout = props => {
  return (
    <div className="layout">
      <Navbar />
      <div className="container my-5 mx-auto">
        { props.children }
      </div>
    </div>
  );
}

export default Layout
