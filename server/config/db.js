const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Error: ", err.message));

const connection = mongoose.connection;

module.exports = connection;
