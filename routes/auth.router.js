const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model.js");
const { AppError } = require("../middleware/error-handling");
const { isAuthenticated } = require("../middleware/auth.js");

const router = express.Router();
const saltRounds = 10;

//Post /registration
router.post("/auth/registration", async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    if (userName === "" || email === "" || password === "") {
      throw new AppError("Please fill out the registration fields", 400);
    }

    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
    if (!emailRegex.test(email)) {
      throw new AppError("Email must be a valid email", 400);
    }

    const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/);
    if (!passwordRegex.test(password)) {
      throw new AppError(
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
        400
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("Email already in use", 400);
    }

    const hashedPassword = bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(saltRounds)
    );
    const createdUser = await User.create({
      email,
      password: hashedPassword,
      userName,
    });
    const { _id } = createdUser;
    res.status(201).json({ user: { email, userName, _id } });
  } catch (err) {
    next(err);
  }
});

//Post /login
router.post("/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new AppError("User not found", 400);
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      throw new AppError("Incorrect password", 400);
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});

//Get /auth/verify

router.get("/auth/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
});

//export router
module.exports = router;
