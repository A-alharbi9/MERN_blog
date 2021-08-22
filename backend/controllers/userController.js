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

    if (!userExists) return res.status(400).json("User Does Not Exist!");

    const passwordCompare = await bcrypt.compare(password, userExists.password);

    if (!passwordCompare) return res.status(400).json("Invalid Data!");

    const token = jwt.sign(
      { email: userExists.email, id: userExists._id },
      secret,
      {
        expiresIn: "2h",
      }
    );

    localStorage.setItem("userProfile", JSON.stringify(token));

    res.status(200).json({ userExists, token });
  } catch (error) {
    res.status(500).send("Something went wrong, could not sign in user");
  }
};

const signUp = async (req, res) => {
  const user = req.body;

  const { firstName, lastName, email, password } = user;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json("User Already Exists!");

    const passwordHash = await bcrypt.hash(password, 12);

    const createUser = await User.create({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      password: passwordHash,
    });

    const token = jwt.sign(
      { email: createUser.email.user.email, id: createUser._id },
      secret,
      {
        expiresIn: "2h",
      }
    );

    localStorage.setItem("userProfile", JSON.stringify(token));

    res.status(201).json({ createUser, token });
  } catch (error) {
    res.status(500).send("Something went wrong, could not sign up user");

    console.log(error);
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
