const axios = require("axios");

const urlBase = axios.create({ baseURL: "http://localhost:5000" });

const getThePosts = () => urlBase.get("/posts");

const createPost = (newpost) => urlBase.post("/posts", newpost);

const signUpUser = (newUser) => urlBase.post("/user/signUp", newUser);
const signInUser = (newUser) => urlBase.post("/user/signIn", newUser);

urlBase.interceptors.request.use((req) => {
  if (localStorage.getItem("userProfile")) {
    req.headers.authorization = `User ${
      JSON.parse(localStorage.getItem("UserProfile")).token
    }`;
  }
  return req;
});

module.exports = { getThePosts, createPost, signUpUser, signInUser };
