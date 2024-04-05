const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const { AppError } = require("../middleware/error-handling");

// retrieve specific user by ID
router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError("Invalid user ID format", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const { _id, email, name } = user;
    res.status(200).json({ _id, email, name });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
