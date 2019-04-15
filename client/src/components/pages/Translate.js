import React, { Component } from "react";
import Layout from "../layout/Layout";
import dictionary from "../../dictionary.json";

class Translate extends Component {
  state = {
    dictionary: dictionary.dictionary,
    search: "",
    items: []
  };

  componentWillMount() {
    this.setState({ items: this.state.dictionary });
  }

  onInputChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  search = e => {
    let value = e.target.value;
    this.setState({ search: value }, () => {
      let words = this.state.dictionary;
      words = words.filter(word => {
        return (
          word.ibibio.toLowerCase().search(value.toLowerCase()) !== -1 ||
          word.english.toLowerCase().search(value.toLowerCase()) !== -1
        );
      });
      this.setState({ items: words });
    });
  };

  render() {

    const { items } = this.state;
    return (
      <Layout>
        <div className="row">
          <div className="col-12">
            <h3 className="text-center mb-4">Ibibio - English Dictionary</h3>
          </div>
          <div className="col-12">
            <form className="form-inline w-100 mb-3">
              <div className="form-group w-100">
                <input
                  type="search"
                  id="search"
                  className="form-control form-control-lg w-100"
                  placeholder="Type to filter"
                  value={this.state.search}
                  onChange={e => this.search(e)}
                />
              </div>
            </form>
            <table className="table">
              <thead className="bg-danger text-white">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Ibibio</th>
                  <th scope="col">English</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={`${item}__${i}`}>
                    <th scope="row">{i < 10 ? `0${i}` : i}</th>
                    <td>
                      <strong>{String(item.ibibio).split("/")[0]}</strong>
                      <i>{String(item.ibibio).split("/")[1]}</i>
                    </td>
                    <td>
                      <strong>{item.english}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Translate;
