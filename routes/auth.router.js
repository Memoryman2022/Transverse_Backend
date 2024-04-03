const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/user.model.js");

const router = express.Router();
const saltRounds = 10;

//Post /auth/signup

router.post("/registration", (req, res) => {
  const { name, email, password } = req.body;
  //check name/email/password is empty
  if (name === "" || email === "" || password === "") {
    res
      .status(400)
      .json({ message: "Please fill out the registration fields" });
    return;
  }
});

//Post /auth/login

router.post();

//Get /auth/verify
const { isAuthenticated } = require("../middleware/auth.js");

router.get("/verify", isAuthenticated, (req, res) => {
  const { _id, name, email } = req.body;

  res.status(200).json({ _id, name, email });
});

//export router
module.exports = router;
