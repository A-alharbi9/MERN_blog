const bcryptjs = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userModel");
const createError = require("http-errors");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }, (err, data) => {
        try {
          if (err) {
            console.log("error: ", err);
            throw createError.InternalServerError();
          }
          if (!data) {
            return done(null, false, { message: "User Doesn't Exist !" });
          }
          bcryptjs.compare(password, data.password, (erro, match) => {
            if (err) {
              console.log("error: ", err);
              return done(null, false);
            }
            if (!match) {
              return done(null, false, { message: "User Doesn't Exist !" });
            }
            if (match) {
              return done(null, data);
            }
          });
        } catch (error) {
          console.log("Err: ", error);
          next(error);
        }
      });
    })
  );

  passport.serializeUser((data, done) => {
    done(null, data.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, data) => {
      done(err, data);
    });
  });
};
