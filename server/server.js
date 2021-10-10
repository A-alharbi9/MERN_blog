const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const port = process.env.PORT || 5000;
const blogRouter = require("./routes/blogRouter");
const userRouter = require("./routes/userRoute");
const connection = require("./config/db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", blogRouter);
app.use("/user", userRouter);

connection.once("open", () => console.log("Status: 200"));

const checkCredientials = (req, res, next) => {
  const reqHeader = req.headers["authorization"];
  if (typeof reqHeader !== "undefined") {
    const bearer = reqHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.status(403).send("<h1>Unauthorized</h1>");
  }
};

app.get("/protected", checkCredientials, (req, res) => {
  jwt.verify(req.token, secret, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.status(200).json(data);
    }
  });
  res.send("<h3>Protected</h3>");
});
app.get("/", (req, res) => {
  res.send("<h3>Server</h3>");
});

app.listen(port, console.log(`listening on port: ${port}`));
