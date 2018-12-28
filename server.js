const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const newUserRoute = require("./api/routes/DLHUser");
const newChatKitUserRoute = require("./api/routes/ChatkitUser");
const ChatKitAuthenticateRoute = require("./api/routes/ChatKitAuthenticate");

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://francisudeji:desales9563@ds025469.mlab.com:25469/dakada-language-hub";
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// listen for requests
app.use("/api/newUser", newUserRoute);
app.use("/api/newChatkitUser", newChatKitUserRoute);
app.use("/api/chatkitAuthenticate", ChatKitAuthenticateRoute);

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useCreateIndex: true }
);

const db = mongoose.connection;
db.on("error", err => console.log(err));
db.once("open", () => {
  require("./api/routes/Posts")(app);
  console.log(`Mongoose Server started`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });
}

app.listen(PORT, err => {
  if (err) console.log(`Server error ${err}`);
  console.log(`Server started on port ${PORT}`);
});
