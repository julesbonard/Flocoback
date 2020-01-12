require("dotenv").config();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
const User = require("./sequelize/models/users");

const credentials = {
  facebook: {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:8000/login/auth/facebook/callback",
    profileFields: ["id", "emails", "name"]
  },
  google: {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:8000/login/auth/google/callback"
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
  new FacebookStrategy(
    credentials.facebook,
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      let userData = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        pseudo: profile.name.givenName,
        token: accessToken
      };
      const [user, created] = await User.findOrCreate({
        where: {
          email: userData.email
        },
        defaults: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          pseudo: userData.pseudo,
          isOAuth: true
        }
      });
      user.jwt = jwt.sign({ email: userData.email }, secret, {
        expiresIn: "1h"
      });

      done(null, user);
    }
  )
);

//GOOGLE strategy
passport.use(
  new GoogleStrategy(
    credentials.google,
    async (accesToken, refreshToken, profile, done) => {
      console.log(profile);

      let userData = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        pseudo: profile.displayName,
        avatar: profile.photos[0].value,
        token: accesToken
      };

      const [user, created] = await User.findOrCreate({
        where: {
          email: userData.email
        },
        defaults: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          pseudo: userData.pseudo,
          avatar: userData.avatar,
          isOAuth: true
        }
      });

      user.jwt = jwt.sign({ email: userData.email }, secret, {
        expiresIn: "1h"
      });

      done(null, user);
    }
  )
);
