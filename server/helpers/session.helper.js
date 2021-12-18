const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config({ path: "./.env" });

module.exports = {
  sessionInit: session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
    cookie: {
      //20 Hours
      maxAge: 72000000,
      //in production it is true
      // httpOnly: true,
      // sameSite: false,
      // secure: false,
    },
  }),
};
