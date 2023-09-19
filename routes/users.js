const bcrypt = require("bcrypt");
const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const { User, validateUser } = require("../models/userModel");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

// @desc Register a user
// @route POST /api/users
// @access Public
router.post("/", async (req, res) => {
  //check valid req
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists");

  //hash pass
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(req.body.password, salt);

  //create new user in mongo
  user = new User({
    name: req.body.name,
    password: password,
    email: req.body.email,
  });
  //return result
  try {
    const result = await user.save();
    res.json(_.pick(result, ["name", , "email", "_id"]));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//login?

module.exports = router;
