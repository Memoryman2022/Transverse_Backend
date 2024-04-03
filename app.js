const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const authRoutes = require("./routes/auth.router");

const PORT = process.env.PORT;
app.use(express.json());
app.use(morgan("dev"));
app.use(authRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("There was an error connecting to the DB", err);
  });

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5005"],
  })
);

//authentification route

const authRouter = require("./routes/auth.router");
app.use("/auth", authRouter);

//protected route for serching user by ID

const { isAuthenticated } = require("./middleware/auth");
// const userRouter = require("./routes/user.router");
// app.use("/api/users", isAuthenticated, userRouter);

//listen
app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
