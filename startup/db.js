require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("./logger");

module.exports = () => {
  //conecting mongo db
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => logger.info("Connected..."))
    .catch((e) => logger.error("Error: mongodb", e));
};
