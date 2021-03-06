const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:5000",
});

const getThePosts = () => api.get("/posts");

const createPost = (newpost) => api.post("/posts", newpost);

const signUp = (newUser) => api.post("/user/signUp", newUser);

const login = (user) =>
  api.post("/user/login", user, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

const logout = () => api.get("/user/logout");

module.exports = { getThePosts, createPost, signUp, login, logout };
