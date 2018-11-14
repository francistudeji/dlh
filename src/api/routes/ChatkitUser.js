const express = require("express");
const router = express.Router();
const chatkit = require('../../lib/chatKitClient')

router.post("/", (req, res) => {
  const { id, username } = req.body;
  chatkit
    .createUser({
      id,
      name: username
    })
    .then(() => {
      res.status(201).json({ msg: "[chatkit] User Created" });
    })
    .catch(error => {
      if (error.error_type === "services/chatkit/user_already_exists") {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

module.exports = router

