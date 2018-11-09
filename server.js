const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const newUserRoute = require("./src/api/routes/DLHUser");
const newChatKitUserRoute = require("./src/api/routes/ChatkitUser");
const ChatKitAuthenticateRoute = require("./src/api/routes/ChatKitAuthenticate");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// listen for requests
app.use("/api/newUser", newUserRoute);
app.use("/api/newChatkitUser", newChatKitUserRoute);
app.use("/api/chatkitAuthenticate", ChatKitAuthenticateRoute);

// run node server and listen on port 3001
app.listen(PORT, err => {
  if (err) console.log(`Server error ${err}`);
  console.log(`[1] Server started on PORT ${PORT}`);
});
