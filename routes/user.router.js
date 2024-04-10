const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const { authenticateToken } = require("../middleware/authenticateToken");
const { AppError } = require("../middleware/error-handling");

//protected routes
//find user-protected

router.get("/protected/user", authenticateToken, async (req, res, next) => {
  try {
    const userId = req.payload.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError("Invalid user ID", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const { _id, email, userName } = user;

    res.status(200).json({ _id, email, userName });
  } catch (error) {
    next(error);
  }
});

//update user-protected
router.put(
  "/protected/user-update",
  authenticateToken,
  async (req, res, next) => {
    try {
      const userId = req.payload.userId;

      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });

      if (!updatedUser) {
        throw new AppError("user not found", 404);
      }

      res.status(200).json({ message: "user updated", updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

//delete user-protected
router.delete("/protected/user/", authenticateToken, async (req, res, next) => {
  try {
    const userId = req.payload.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new AppError("Could not delete user", 404);
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
