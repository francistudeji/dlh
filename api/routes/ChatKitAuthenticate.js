const express = require("express");
const router = express.Router();
const chatkit = require("../../lib/chatKitClient");

router.post("/", (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });

  res.status(authData.status).send(authData.body);
});

module.exports = router;
