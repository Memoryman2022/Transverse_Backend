const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model.js");

const router = express.Router();
const saltRounds = 10;

//Post /auth/signup

router.post("/registration", async (req, res) => {
  const { userName, email, password } = req.body;

  //check userName/email/password is empty
  if (userName === "" || email === "" || password === "") {
    res
      .status(400)
      .json({ message: "Please fill out the registration fields" });
    return;
  }

  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "email must be a valid email" });
    return;
  }

  const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/);
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save;

    res.status(200).json({ message: "New user successfully created" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// //check if input email already exists
// User.findOne({ email }).then((foundUser) => {
//   //if so send error response
//   if (foundUser) {
//     res.status(400).json({ message: "User already exists." });
//     return;
//   }
//   //if email not found proceed to hash the password
//   const salt = by;
// });

//Post /auth/login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect  password" });
    }
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.log(error);
  }
});

//Get /auth/verify
const { isAuthenticated } = require("../middleware/auth.js");

router.get("/verify", isAuthenticated, (req, res) => {
  const { _id, userName, email } = req.body;

  res.status(200).json({ _id, userName, email });
});

//export router
module.exports = router;
