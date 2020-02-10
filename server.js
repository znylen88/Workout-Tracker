const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/workout";
mongoose.connect(MONGODB_URI);

// routes
app.use(require("./routes/api"));
app.use(require("./routes/view"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});