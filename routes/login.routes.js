require("dotenv").config();
const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const { checkAuth } = require("../middlewares/tokenJwt");

const User = require("../sequelize/models/users");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
        isOAuth: false
      }
    });
    if (!user) {
      res.status(404).json({
        message: "User not found"
      });
    }
    if (!user.checkPassword(password)) {
      res.status(403).json({
        message: "Invalid password !"
      });
    }
    const id = user.uuid;
    const payload = { email };
    const token = jwt.sign(payload, secret, {
      expiresIn: "1h"
    });
    res.status(200).json({ token, id });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// FACEBOOK
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/", session: false }),
  (req, res) => {
    const { uuid, jwt } = req.user;
    res.redirect(
      `http://localhost/login?token=${jwt}&id=${uuid}`
    );
  }
);

// GOOGLE
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    const { uuid, jwt } = req.user;
    res.redirect(
      `http://localhost/login?token=${jwt}&id=${uuid}`
    );
  }
);

module.exports = router;
