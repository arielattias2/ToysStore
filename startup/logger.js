const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(), // Log format
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log only errors to a file
  ],
});

module.exports = logger;
