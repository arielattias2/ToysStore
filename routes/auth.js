const bcrypt = require("bcrypt");
const express = require("express");
const _ = require("lodash");
const { User } = require("../models/userModel");
const Joi = require("joi");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

// @desc Login a user
// @route POST /api/auth
// @access Public
router.post("/", async (req, res) => {
  console.log(req.body);
  //check valid req
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or pasword");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or pasword");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(user) {
  const schema = Joi.object({
    password: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
  });

  return schema.validate(user);
}

module.exports = router;
