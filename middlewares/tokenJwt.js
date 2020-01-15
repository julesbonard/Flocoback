require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports.checkAuth = (req, res, next) => {
  const token = req.headers["access-token"];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({ message: "invalid token" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      message: "No token provided."
    });
  }
};
