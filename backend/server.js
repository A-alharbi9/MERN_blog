const express = require("express");
const app = express();
const cors = require("cors");
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

app.get("/", (req, res) => {
  res.send("<h3>Server</h3>");
});

app.listen(port, console.log(`listening on port: ${port}`));
