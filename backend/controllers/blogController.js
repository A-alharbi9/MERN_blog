const Blog = require("../models/blogModel");

const getPosts = async (req, res) => {
  try {
    const posts = await Blog.find().sort({ _id: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).send("Not Found");
  }
};
const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const postFetch = await Blog.findById(id);
    res.status(200).json(postFetch);
  } catch (error) {
    res.status(404).send("Not Found");
  }
};
const createPost = async (req, res) => {
  const post = req.body;
  const { title, snippet, body } = post;
  try {
    const newPost = await Blog.create({ title, snippet, body });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(404).send("Could not create post");
  }
};

module.exports = { getPosts, getPost, createPost };
