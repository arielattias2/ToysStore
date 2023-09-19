require("dotenv").config();
const mongoose = require("mongoose");
const winston = require("winston");
const logger = require("./logger");

module.exports = () => {
  //conecting mongo db
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => logger.info("Connected..."));
  // .catch(() => console.log("Error: mongodb"));
};
