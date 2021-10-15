const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const dbUrl = process.env.MONGO_URL;

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Error: ", err.message));

const connection = mongoose.connection;

connection.once("open", () => console.log("Status: 200"));

module.exports = connection;
