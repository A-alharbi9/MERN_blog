const axios = require("axios");

const api = axios.create({ baseURL: "http://localhost:5000" });

const getThePosts = () => api.get("/posts");

const createPost = (newpost) => api.post("/posts", newpost);

const signUpUser = (newUser) => api.post("/user/signUp", newUser);
const signInUser = (newUser) => api.post("/user/signIn", newUser);

api.interceptors.request.use((req) => {
  if (localStorage.getItem("userProfile")) {
    req.headers.authorization = `User ${
      JSON.parse(localStorage.getItem("UserProfile")).token
    }`;
  }
  return req;
});

module.exports = { getThePosts, createPost, signUpUser, signInUser };
