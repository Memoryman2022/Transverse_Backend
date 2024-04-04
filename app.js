require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const offersRoute = require("./routes/offers.router");
const authRoutes = require("./routes/auth.router");
const socialRoutes = require("./routes/social.router");

//ERROR HANDLER
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");

const PORT = process.env.PORT;
app.use(express.json());
app.use(morgan("dev"));
app.use(authRoutes);
app.use(socialRoutes);
app.use(offersRoute);

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5005"],
  })
);
app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("There was an error connecting to the DB", err);
  });

//authentification route
// app.use("/auth", authRouter);

//protected route for serching user by ID

const { isAuthenticated } = require("./middleware/auth");
// const userRouter = require("./routes/user.router");
// app.use("/api/users", isAuthenticated, userRouter);

//Error handler
app.use(errorHandler);

//Not found handler
app.use(notFoundHandler);

//listen
app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
