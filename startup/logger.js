const winston = require("winston");

const logger = winston.createLogger({
  level: "info", // Minimum level to log
  format: winston.format.json(), // Log format (JSON in this example)
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log errors to a file
  ],
});

module.exports = logger;
