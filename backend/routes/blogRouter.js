const express = require("express");
const router = express.Router();
const { getPosts } = require("../controllers/blogController");
const { getPost } = require("../controllers/blogController");
const { createPost } = require("../controllers/blogController");

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", createPost);

module.exports = router;
