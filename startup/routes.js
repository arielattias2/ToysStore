const toys = require("../routes/toys");
const users = require("../routes/users");
const auth = require("../routes/auth");
const express = require("express");
const error = require("../middleware/error");

module.exports = (app) => {
  app.use(express.json());
  app.use("/toys", toys);
  app.use("/users", users);
  app.use("/users/login", auth);
  app.use(error);
};
