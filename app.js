const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(console.log("connected to MongoDB"))
  .catch((err) => {
    console.log("There was an error connecting to the DB", err);
  });

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5005"],
  })
);

app.listen(5005, () => {
  console.log(5005, PORT);
});
