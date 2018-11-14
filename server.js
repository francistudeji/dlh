const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const newUserRoute = require("./src/api/routes/DLHUser");
const newChatKitUserRoute = require("./src/api/routes/ChatkitUser");
const ChatKitAuthenticateRoute = require("./src/api/routes/ChatKitAuthenticate");

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://francisudeji:desales9563@ds025469.mlab.com:25469/dakada-language-hub";
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
  // Connect to Mongoose
  mongoose.set("useFindAndModify", false);
  mongoose.connect(
    MONGODB_URI,
    { useNewUrlParser: true }
  );
});

const db = mongoose.connection;

db.on("error", err => console.log(err));

db.once("open", () => {
  require("./src/api/routes/Posts")(app);
  console.log(`Server started on port ${PORT}`);
});
