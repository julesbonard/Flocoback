require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports.checkAuth = (req, res, next) => {
  const token = req.headers["access-token"];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "invalid token" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "No token provided."
    });
  }
};
