const axios = require("axios");

const url = "http://localhost:5000/posts";

const getThePosts = () => axios.get(url);
const createPost = (newpost) => axios.post(url, newpost);

module.exports = { getThePosts, createPost };
