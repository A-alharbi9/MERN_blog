const User = require("../models/userModel");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send("Not Found");
  }
};

const signUp = async (req, res) => {
  const user = req.body;

  const firstName = user.firstName;
  const lastName = user.lastName;
  const email = user.email.toLowerCase();
  const password = user.password;

  console.log("Db:", firstName, lastName, password, email);

  try {
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json("User Already Exists!");

    const passwordHash = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    res.status(201).json({ createUser });
  } catch (error) {
    res.status(500).send("Something went wrong, could not sign up user");

    console.log("The Error: ", error);
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

module.exports = { login, signUp, getUsers };
