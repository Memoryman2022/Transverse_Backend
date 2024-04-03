const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model.js");

const router = express.Router();
const saltRounds = 10;

//Post /registration
router.post("/registration", (req, res) => {
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

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        res.status(400).json({ message: "Invalid email address" });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);

      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({ email, password: hashedPassword, userName });
    })
    .then((createdUser) => {
      const { email, userName, _id } = createdUser;

      const user = { email, userName, _id };
      res.status(201).json({ user: user });
    })
    .catch((err) => {
      console.error("Error registering user:", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//Post /login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect password" });
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
  res.status(200).json(req.payload);
});

//export router
module.exports = router;
