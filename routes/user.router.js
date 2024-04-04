const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");

// retrieve specific user by ID
router.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "USer not found" });
      }
      const { _id, email, name } = user;
      res.status(200).json({ _id, email, name });
    })
    .catch((error) => {
      console.log("retrieving ID was unsuccessful", error);
      res.status(500).json({ message: "error, sorry" });
    });
});

module.exports = router;
