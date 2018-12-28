const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const newUserRoute = require("./api/routes/DLHUser");
const newChatKitUserRoute = require("./api/routes/ChatkitUser");
const ChatKitAuthenticateRoute = require("./api/routes/ChatKitAuthenticate");
const posts = require("./api/routes/Posts");

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://francisudeji:desales9563@ds025469.mlab.com:25469/dakada-language-hub";
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(cors());
// listen for requests
app.use("/api/newUser", newUserRoute);
app.use("/api/newChatkitUser", newChatKitUserRoute);
app.use("/api/chatkitAuthenticate", ChatKitAuthenticateRoute);
app.use("/api/posts", posts);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
