const User = require("../models/UserModel");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.JWT_SECRET;

const SignIn = async (req, res) => {
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

    res.status(200).json({ userExists, token });
  } catch (error) {
    res.status(500).send("Something went wrong, could not sign up user");
  }
};
const SignUp = async (req, res) => {
  const user = req.body;
  const { firstName, lastName, email, password } = user;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json("User Already Exists!");

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: passwordHash,
    });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret, {
      expiresIn: "2h",
    });

    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(500).send("Something went wrong, could not sign up user");
  }
};

module.exports = { SignIn, signUp };
