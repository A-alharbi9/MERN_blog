const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const blogRouter = require("./routes/blogRouter");
const userRouter = require("./routes/userRoute");
const { sessionInit } = require("./helpers/session.helper");
const passport = require("passport");
require("./config/db");
require("./helpers/passport.helper")(passport);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionInit);

app.use(passport.initialize());
app.use(passport.session());

app.use("/posts", blogRouter);
app.use("/user", userRouter);

// app.get("/protected", checkCredientials, (req, res) => {
//   jwt.verify(req.token, secret, (err, data) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.status(200).json(data);
//     }
//   });
//   res.send("<h3>Protected</h3>");
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
