const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const { AppError } = require("../middleware/error-handling");

route.get("user", async (req, res, next) => {
  try {
    const user = await User.find();
    if (!user) {
      throw new AppError("Users not found", 404);
    }
  } catch (err) {
    next(err);
  }
});
// retrieve specific user by ID
router.get("/user/:userId", async (req, res, next) => {
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

router.put("/user-update/:userId", async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      throw new AppError("User not found", 404);
    }
    res.status(200).json({ message: "User updated", updatedUser });
  } catch (error) {
    next(error);
  }
});

router.delete("/user/:userId", async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      throw new AppError("Could not delete user", 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
