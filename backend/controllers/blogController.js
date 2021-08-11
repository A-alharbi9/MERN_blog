const Blog = require("../models/blogModel");

const getPosts = async (req, res) => {
  try {
    const posts = await Blog.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).send("Not Found");
  }
};
const createPost = async (req, res) => {
  const post = req.body;
  const { title, snippet, body } = post;
  try {
    const newPost = await new Blog({ title, snippet, body });
  } catch (error) {
    res.status(404).send("Could not create post");
  }
};

module.exports = { getPosts, createPost };
