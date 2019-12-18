const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const GoogleStrategy = require("passport-google");
const TwitterStrategy = require("passport-twitter");
const jwt = require("jsonwebtoken");
const keys = require("./index");

const User = require("../sequelize/models/users");

const credentials = {
  facebook: {
    clientID: keys.FACEBOOK.clientID,
    clientSecret: keys.FACEBOOK.clientSecret,
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
    console.log(profile);

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

    done(err, user);
  })
);
