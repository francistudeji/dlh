import React, { Component } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import ResourceCard from '../resource'
class IbibioGrammer extends Component {
  state = {
    resources: [],
    loading: true,
    expanded: false
  };

  componentDidMount() {
    axios({
      url: "http://localhost:5000/api/resources",
      method: "get"
    })
      .then(res => {
        this.setState({ resources: res.data.resources, loading: false });
        console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleView = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    const {expanded} = this.state
    return (
      <Layout>
        <div className="row">
          <div className="col-12 mx-auto">
            <div className="heading-text mx-auto text-center">
              <h1
                className="my-5 pb-2 text-dark text-center"
                style={{
                  borderBottom: "4px solid #dc3545",
                  display: "inline-block"
                }}
              >
                Ibibio Grammer
              </h1>
            </div>
            <hr />
          </div>

          {this.state.resources.length > 0 ? (
            this.state.resources.map(resource => (
              <ResourceCard key={resource._id} resource={resource} expanded={expanded} toggleView={this.toggleView}/>
            ))
          ) : (
            <p className="h1 lead text-center mx-auto">Loading Resources...</p>
          )}
        </div>
      </Layout>
    );
  }
}

export default IbibioGrammer;
