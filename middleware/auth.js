const jwt = require("jsonwebtoken");

//authorization middleware
module.exports = function (req, res, next) {
  const token = req.header("x-api-key");

  if (!token) return res.status(401).send("Access denied. No tooken provided");

  try {
    const decoded = jwt.verify(token, "1234"); //process.env.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).send("Invalid token.");
  }
};
