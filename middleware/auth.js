const jwt = require("jsonwebtoken");

//authorization middleware
module.exports = function (req, res, next) {
  const token = req.header("x-api-key");

  if (!token) return res.status(401).send("Access denied. No tooken provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).send("Invalid token.");
  }
};
