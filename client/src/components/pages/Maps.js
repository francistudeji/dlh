import React, { Component } from "react";
import Layout from "../layout/Layout";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Maps extends Component {
  state = {
    center: {
      lat: 8.8556838,
      lng: 7.1790259999999995
    },
    zoom: 11,
    marker: {
      position: {
        lat: 8.8556838,
        lng: 7.1790259999999995
      },
      title: 'Hello World!'
    }
  };

  componentDidMount() {
    const center = {
      lat: 8.8556838,
      lng: 7.1790259999999995
    }

    navigator.geolocation.watchPosition(position => {
      let lat = position.coords.latitude
      let lng = position.coords.longitude
      center.lat = lat;
      center.lng = lng;

      this.setState({ center })
    }, err => console.log(err))

  }


  render() {
    return (
      <Layout>
        <div className="row">

          <div className="col-12 mx-auto">
            <div className="heading-text mx-auto text-center mt-4">
              <h2
                className="my-5 pb-2 text-dark text-center"
                style={{
                  borderBottom: "4px solid #dc3545",
                  display: "inline-block"
                }}
              >
                Map Showing Ibibio Speaking Regions
              </h2>
            </div>
            <hr />
          </div>

        </div>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAsyi7zylJrm2X1G_WcVC-yQR0eNeYI6ik"
            }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            defaultMarker={this.state.marker}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text={"Kreyser Avrora"}
            />
          </GoogleMapReact>
        </div>
      </Layout>
    );
  }
}

export default Maps;

/**
 *
 *
 *
 *
 */
