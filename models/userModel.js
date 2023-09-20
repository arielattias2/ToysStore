const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateCreated: { type: Date, default: Date.now },
  role: { type: String, default: "USER" },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
  });

  return schema.validate(user);
}
const User = mongoose.model("user", userSchema);
module.exports = { User, validateUser };
