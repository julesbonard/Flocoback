require("dotenv").config();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const GoogleStrategy = require("passport-google");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
const User = require("./sequelize/models/users");

const credentials = {
  facebook: {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "/auth/facebook/callback"
  }
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//FACEBOOK strategy
passport.use(
  new FacebookStrategy(credentials.facebook, async function(
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    let userData = {
      email: profile.email[0].value,
      name: profile.username,
      token: accessToken
    };
    await User.findOrCreate({
      where: {
        email: userData.email
      },
      defaults: {
        isOAuth: false
      }
    });
    userData.jwt = jwt.sign({ email: userData.email }, secret, {
      expiresIn: "1h"
    });

    done(null, userData);
  })
);
