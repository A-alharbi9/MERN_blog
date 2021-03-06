const express = require("express");
const session = require("express-session");
const passport = require("passport");
const router = express.Router();
const createError = require("http-errors");
const { signUp, logout } = require("../controllers/userController");
const { getUsers } = require("../controllers/userController");

router.get("/users", getUsers);

router.post("/login", (req, res, next) => {
  console.log(req.body.email);
  console.log(req.body.password);
  passport.authenticate("local", (err, user, info) => {
    try {
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
      });

      req.session.save((error) => {
        if (error) {
          console.log("error in saving: ", error);
        }
      });
      const userInfo = { username: req.user.username, email: req.user.email };

      req.session.user = userInfo;
      req.session.authenticated = true;

      return res.status(200).json({
        msg: "Succes",
        user: userInfo,
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

router.post("/signUp", signUp);

router.get("/logout", logout);

module.exports = router;
