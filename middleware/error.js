const logger = require("../startup/logger");

module.exports = function (err, req, res, next) {
  //Log
  //logger.info("This is an informational message.");
  logger.error(err.message, { err });
  res.status(500).json({ error: "Internal server error." });
};
