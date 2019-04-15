import React, { Component } from "react"
import { Link } from "react-router-dom"
import Layout from "../layout/Layout"
import axios from "axios"


class Poetry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poetries: [],
      loading: true
    }
  }

  getPoetries = () => {
    axios({
      url: "/api/poetries",
      method: "get"
    })
      .then(res => {
        this.setState({ poetries: [...this.state.poetries, ...res.data.poets] })
      })
      .catch(err => console.log({ err }))
  }

  componentDidMount() {
    //this.props.getPoetries()
  }

  render() {
    return (
      <Layout>

      </Layout>
    )
  }
}



export default Poetry
