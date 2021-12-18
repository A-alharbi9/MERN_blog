const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const blogRouter = require("./routes/blogRouter");
const userRouter = require("./routes/userRoute");
const sessionRouter = require("./routes/sessionRoute");
const { sessionInit } = require("./helpers/session.helper");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./config/db");
require("./helpers/passport.helper")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(cookieParser());

app.use(sessionInit);

app.use(passport.initialize());
app.use(passport.session());

app.use("/posts", blogRouter);
app.use("/user", userRouter);
app.use("/session", sessionRouter);

// app.get("/protected", (req, res) => {
//   console.log(req.session);

//   console.log(res.cookies);

//   if (req.session) {
//     return res.status(200).send("<h3>Protected</h3>");
//   }
//   return res.status(401).send("<h3>Nooooo!</h3>");
// });

app.get("/", (req, res) => {
  res.send("<h3>Server</h3>");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
      stack: err.stack,
    },
  });
});

app.listen(port, console.log(`listening on port: ${port}`));
