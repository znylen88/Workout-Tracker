const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


const PORT = 3006;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout"
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
});

require("./routes/api.js")(app);
require("./routes/view.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});