const express = require("express");
const router = express.Router();
const { signIn } = require("../controllers/userController");
const { signUp } = require("../controllers/userController");
const { getUsers } = require("../controllers/userController");

router.get("/users", getUsers);
router.post("/signIn", signIn);
router.post("/signUp", signUp);

module.exports = router;
