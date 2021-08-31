const User = require("../models/UserModel");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.JWT_SECRET;

const signIn = async (req, res) => {
  const user = req.body;

  const { email, password } = user;

  try {
    const userExists = await User.findOne({ email });

    if (!userExists) return res.status(400).send("User Does Not Exist!");

    const passwordCompare = await bcrypt.compare(password, userExists.password);

    if (!passwordCompare) return res.status(400).json("Invalid Data!");

    const token = jwt.sign(
      { email: userExists.email, id: userExists._id },
      secret,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({ userExists, token });
  } catch (error) {
    res.status(500).send("Something went wrong, could not sign in user");
  }
};

const signUp = async (req, res) => {
  const user = req.body;

  const firstName = user.firstName;
  const lastName = user.lastName;
  const email = user.email;
  const password = user.password;

  console.log("Db:", firstName, lastName, password, email);

  try {
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json("User Already Exists!");

    const salt = await bcrypt.genSalt(12);

    const passwordHash = await bcrypt.hash(password, salt);

    const createUser = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    const token = jwt.sign(
      { email: createUser.email, id: createUser._id },
      secret,
      {
        expiresIn: "15m",
      }
    );

    res.status(201).json({ createUser, token });
  } catch (error) {
    res.status(500).send("Something went wrong, could not sign up user");

    console.log("The Error: ", error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send("Not Found");
  }
};

module.exports = { signIn, signUp, getUsers };
