const express = require("express");
const passport = require("passport");
const router = express.Router();
const createError = require("http-errors");
const { signUp } = require("../controllers/userController");
const { getUsers } = require("../controllers/userController");

router.get("/users", getUsers);

router.post("/login", (req, res, next) => {
  console.log(req.body.email);
  console.log(req.body.password);
  passport.authenticate("local", (err, user, info) => {
    try {
      console.log(err);

      console.log(info);
      if (err) {
        throw createError.InternalServerError();
      }
      if (!user) {
        throw createError.NotFound("User doesn't exist!!");
      }

      req.logIn(user, (err) => {
        if (err) {
          throw createError.InternalServerError();
        }
        console.log("IN: ", user);
      });

      console.log(user);

      return res.json(user);
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

router.post("/signUp", signUp);

router.post("/logout", (req, res, next) => {
  req.logOut();
});

module.exports = router;
