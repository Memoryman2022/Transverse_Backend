require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const offerRoutes = require("./routes/offers.router");
const authRoutes = require("./routes/auth.router");
const socialRoutes = require("./routes/social.router");
const reviewRoutes = require("./routes/review.router");

//connect to mongo
mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("There was an error connecting to the DB", err);
  });

//middleware

//ERROR HANDLER
const {
  errorHandler,
  notFoundHandler,
  AppError,
} = require("./middleware/error-handling");

//CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5005"],
  })
);
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use(authRoutes);
app.use(socialRoutes);
app.use(offerRoutes);
app.use(reviewRoutes);

//protected route for serching user by ID
const { isAuthenticated } = require("./middleware/auth");
// const userRouter = require("./routes/user.router");
// app.use("/api/users", isAuthenticated, userRouter);

//Error handler
app.use(errorHandler);

//Not found handler
app.use(notFoundHandler);

//listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
