const express = require("express");
const router = express.Router();
const oktaClient = require("../../lib/oktaClient");

/* Create a new User (register). */
router.post("/", (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      displayName: req.body.displayName,
      email: req.body.email,
      login: req.body.email
    },
    credentials: {
      password: {
        value: req.body.password
      }
    }
  };
  oktaClient
    .createUser(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;

// membership token
// 00-nfg0b4gc2t6Odt8Jry2qM64beIrpUe56vFgEtRM
