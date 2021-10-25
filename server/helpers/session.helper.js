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
      //3 Hours
      maxAge: 60000,
      //in production it is true
      httpOnly: false,
      sameSite: false,
      secure: false,
    },
  }),
};
