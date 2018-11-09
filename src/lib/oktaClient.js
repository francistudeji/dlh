const okta = require("@okta/okta-sdk-nodejs");

const client = new okta.Client({
  orgUrl: "https://dev-107219.oktapreview.com",
  token: "00-nfg0b4gc2t6Odt8Jry2qM64beIrpUe56vFgEtRM"
});

module.exports = client;
