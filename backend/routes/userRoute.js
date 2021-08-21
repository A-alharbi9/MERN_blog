const express = require("express");
const router = express.Router();
const { signIn } = require("../controllers/userController");
const { signUp } = require("../controllers/userController");

router.post("/signIn", signIn);
router.post("/signUp", signUp);

module.exports = router;
