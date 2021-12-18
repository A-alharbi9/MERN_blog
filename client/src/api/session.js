const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:5000",
});

const checkSessionStatus = () =>
  api.get("/session/checkSession", { withCredentials: true });

module.exports = { checkSessionStatus };
