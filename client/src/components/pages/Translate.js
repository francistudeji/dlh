import React, { Component } from "react";
import axios from "axios";
import Layout from "../layout/Layout";
import dictionary from "../../dictionary.json";

class Translate extends Component {
  state = {
    english: "",
    ibibio: "",
    from: "",
    to: "",
    isloading: false,
    endpoint: "",
    error: "",
    dictionary: dictionary.dictionary,
    search: "",
    items: []
  };

  componentWillMount() {
    this.setState({ items: this.state.dictionary });
  }

  // componentDidMount() {
  //   this.setState({ dictionary: dictionary.dictionary }, () => {
  //     console.log(this.state.dictionary);
  //   });
  // }

  onInputChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getTranslationData = (from, to, isToIbb) => {
    axios
      .get(this.state.endpoint)
      .then(res => {
        console.log(res.data);
        if (res.data.result === "ok") {
          if (isToIbb) {
            const ibibio = res.data.tuc[0].phrase.text;
            this.setState({
              ibibio,
              isloading: false
            });
          } else {
            console.log(res.data);
            const english = res.data.tuc[0].phrase.text;
            this.setState({
              english,
              isloading: false
            });
          }
        }
      })
      .catch(err => {
        if (err) {
          this.setState({
            error: "Could not find word in the dictionary",
            isloading: false
          });
        }
      });
  };

  translateTo = targetLang => {
    if (targetLang === "ibibio") {
      if (this.state.english === "")
        this.setState(
          {
            error: "Input field cannot be empty",
            isloading: false
          },
          () => false
        );
      this.setState(
        {
          from: "eng",
          to: "ibb",
          ibibio: "",
          isloading: true,
          endpoint: `https://cors-anywhere.herokuapp.com/https://glosbe.com/gapi/translate?from=eng&dest=ibb&format=json&phrase=${this.state.english.toLocaleLowerCase()}&pretty=true`
        },
        () => this.getTranslationData(this.state.from, this.state.to, true)
      );
    }

    if (targetLang === "english") {
      if (this.state.ibibio === "")
        this.setState(
          {
            error: "Input field cannot be empty",
            isloading: false
          },
          () => false
        );
      this.setState(
        {
          from: "ibb",
          to: "eng",
          english: "",
          isloading: true,
          endpoint: `https://cors-anywhere.herokuapp.com/https://glosbe.com/gapi/translate?from=ibb&dest=eng&format=json&phrase=${this.state.ibibio.toLocaleLowerCase()}&pretty=true`
        },
        () => this.getTranslationData(this.state.from, this.state.to, false)
      );
    }
  };

  search = e => {
    // let searchTerm = e.target.value;
    // this.setState({ search: searchTerm }, () => {
    //   const words = [...this.state.dictionary];
    //   const found = [];
    //   const notFound = []
    //   this.state.dictionary.map(word => {
    //     if (
    //       word.ibibio.includes(searchTerm) ||
    //       word.english.includes(searchTerm)
    //     ) {
    //       found.push(word);
    //       this.setState({ dictionary: found });
    //     } else {
    //       notFound.push(word);

    //     }
    //   });
    // });
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
    const styles = {
      fontSize: {
        fontSize: "30px"
      }
    };
    const { english, ibibio, isloading, error, items } = this.state;
    return (
      <Layout>
        <div className="row">
          <div className="col-12">
            <h3 className="text-center mb-4">Ibibio - English Translations</h3>
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
                  //onKeyUp={e => this.search(e)}
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

const data = `

<div className="col-6 text-right float-right">
{isloading === true ? (
    <div>
    {/* <Spinner
                  size={50}
                  spinnerColor={"#333"}
                  spinnerWidth={2}
                visible={true} /> */}
                {console.log("loading")}
                </div>
                ) : (
                  ""
                  )}
                  </div>
                  </div >
                  <div className="row">
                  {error !== "" ? (
                    <div
                    className="alert alert-danger mx-auto"
        style={{ width: "94%" }}
        >
        {error}
        </div>
        ) : (
          ""
          )}
          </div>
          <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <div className="card">
          <div className="card-header">
          <div className="row">
          <div className="col-6">
          <p className="lead">English</p>
          </div>
          <div className="col-6 text-right">
          <button
          onClick={e => this.translateTo("ibibio")}
                className="btn btn-primary"
                >
                translate
                </button>
                </div>
                </div>
                </div>
                <div className="card-body">
                <textarea
                required
                rows="3"
                name="english"
                className="form-control"
                value={english}
                onChange={e => this.onInputChanged(e)}
                style={styles.fontSize}
                />
                </div>
                </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="card">
                <div className="card-header">
                <div className="row">
                <div className="col-6">
                <p className="lead">ibibio</p>
                </div>
                <div className="col-6 text-right">
                <button
                onClick={e => this.translateTo("english")}
                className="btn btn-primary"
                >
                translate
                </button>
                </div>
                </div>
                </div>
                <div className="card-body">
                <textarea
                required
                rows="3"
                name="ibibio"
                className="form-control"
                value={ibibio}
                onChange={e => this.onInputChanged(e)}
                style={styles.fontSize}
                />
                </div>
                </div>
                </div>
                `;
