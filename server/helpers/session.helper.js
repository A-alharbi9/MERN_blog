const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config({ path: "./.env" });

module.exports = {
  sessionInit: session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  }),
};
