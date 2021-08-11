const express = require("express");
const router = express.Router();
const { getPosts } = require("../controllers/blogController");
const { createPost } = require("../controllers/blogController");

router.get("/", getPosts);
router.post("/", createPost);

module.exports = router;
