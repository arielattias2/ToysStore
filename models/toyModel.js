const mongoose = require("mongoose");
const Joi = require("joi");

// Define toy schema
const toySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
    unique: true,
  },
  info: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  img_url: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: String,
    required: true,
  },
});

// Validation function
function validateToy(toy) {
  // Define Joi schema for toy validation
  const toyJoiSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    info: Joi.string().required(),
    category: Joi.string().min(5).max(50).required(),
    img_url: Joi.string().required(),
    price: Joi.number().min(0).max(100).required(),
    user_id: Joi.string(),
  });

  return toyJoiSchema.validate(toy);
}

const Toy = mongoose.model("Toy", toySchema);
module.exports = { Toy, validateToy };
