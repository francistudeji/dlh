import React, { Component } from 'react';
import Navbar from '../layout/Navbar'

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1>Home</h1>
        </div>
      </div>
    );
  }
}

export default Home;