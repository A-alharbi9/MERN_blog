const session = require("express-session");
const User = require("../models/userModel");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send("Not Found");
  }
};

const signUp = async (req, res, next) => {
  const user = req.body;

  const firstName = user.firstName;
  const lastName = user.lastName;
  const username = user.username;
  const email = user.email.toLowerCase();
  const password = user.password;

  console.log("Db:", firstName, lastName, username, password, email);

  try {
    const userExists = await User.findOne({ email });

    if (userExists) throw createError.BadRequest("User Already Exists!");

    const passwordHash = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: passwordHash,
    });

    console.log(createUser);

    res.status(201).json({ user: createUser });
  } catch (error) {
    console.log("The Error: ", error);

    next(error);
  }
};

const login = async (req, res) => {
  const user = req.body;

  const { email, password } = user;

  try {
    const userExists = await User.findOne({ email });

    if (!userExists) return res.status(400).send("User Does Not Exist!");

    const passwordCompare = await bcrypt.compare(password, userExists.password);

    if (!passwordCompare) return res.status(400).json("Invalid Data!");

    res.status(200).json({ userExists });
  } catch (error) {
    res.status(500).send("Something went wrong, could not sign in user");
  }
};

const logout = async (req, res, next) => {
  try {
    console.log(req.session.user);
    console.log(req.user);

    console.log("Before: ", req.session);
    // console.log("Before: ", req.session.user);
    // console.log("Before: ", req.session.passport.user);
    req.session.destroy((err) => {
      if (err) {
        console.log("error: ", err);
        throw err;
      }
    });
    res.clearCookie("connect.sid");

    req.logout();

    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = { login, signUp, logout, getUsers };
